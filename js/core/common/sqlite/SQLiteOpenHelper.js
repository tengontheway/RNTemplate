/**
 * 本地数据库的版本兼容，所有创建的数据库表都需要注册到Config.db/Version表中
 * 在打开表的时候，检测是否需要升级当前表
 *
 * constant.DBVERSION保存最新版本，newestVersion = 【1，max_version】
 * OpenHelper中的DB版本需要升级的版本 upgradeVersion = 【0, newestVersion-1】
 *
 * eg.newestVersion = 3 数据库中默认版本是0，需要升级版本【0， 1， 2】
 *
 * Created by EvilCode.T on 12/12/2016.
 */
import SQLiteWrapper from './SQLiteWrapper'

export default class SQLiteOpenHelper {

    static register() {
        for (let key in constant.TABLETYPE) {
            let name = key.toLowerCase()
            let func_name = `_onOpen_${name}`

            if (!SQLiteOpenHelper[func_name]) {
                console.logWarn("SQLiteOpenHelper must register function" + func_name)
            }
        }
    }

    /**
     * 打开并升级
     * @param sqlite_type
     * @param db
     * @param oldVersion
     * @returns {*|number}
     */
    static async open(sqlite_type, db, oldVersion, table_name) {
        try {
            SQLiteOpenHelper.db = db

            // 安全监测，如果表不存在，则重置版本
            let is_exist = await gfuncs.isTableExist(db, table_name)
            if (!is_exist) {
                oldVersion = 0
            }

            let curVersion = oldVersion || 0

            let newVersion = constant.DBVERSION[sqlite_type]
            if (newVersion === null) {
                alert("unknown sqlitetype:" + sqlite_type)
                return curVersion
            }

            console.log("----------------------table_name:" + table_name + " curVersion:" + curVersion + " newVersion: " + newVersion)

            while (curVersion < newVersion) {
                await SQLiteOpenHelper._onOpen(sqlite_type, curVersion, newVersion, table_name)

                curVersion = curVersion + 1
                config.DB_VERSIONS[table_name] = curVersion

                await SQLiteOpenHelper._saveNewVersionToDB(table_name, curVersion)
            }

            return curVersion
        }
        catch (err) {
            console.warn("SQLiteOpoenHelper err:" + utils.toString(err))
        }
    }

    /**
     * 执行SQL语句
     * 获得Transaction,每次的transaction都只能使用一次...
     * 是bug还是哪里导致的错误，还有效率问题
     * @param sqlc
     * @param others
     */
    static async executeSql(sqlc, ...others) {
        let tx = await SQLiteWrapper.transaction(SQLiteOpenHelper.db)
        return await SQLiteWrapper.executeSql(tx, sqlc, ...others)
    }

    /**
     * 将新版本保存到数据库中
     * @param table_name 表格名
     * @param newVersion 最新版本
     * @private
     */
    static async _saveNewVersionToDB(table_name, newVersion) {
        console.log("_saveNewVersionToDB tb_name:" + table_name + " newVersion:" + newVersion)
        await gfuncs.saveVersionToDB(table_name, newVersion)
    }

    static async _onOpen(type, curVersion, newVersion, table_name) {
        let find_key
        for (let key in constant.TABLETYPE) {
            if (constant.TABLETYPE[key] == type) {
                find_key = key
                break
            }
        }

        if (find_key) {
            find_key = find_key.toLowerCase()
            let func_name = `_onOpen_${find_key}`
            let func = SQLiteOpenHelper[func_name]
            if (func) {
                return await func(curVersion, newVersion, table_name)
            }
        } else {
            alert("SQLiteOpenHelper has unregistered type:" + type)
        }
    }

    /**
     * 聊天表
     {
        id,
        userid,
        type,
        owner, (准备丢弃)
        content,
        time, (使用createtime替代)
        svrid,
        createtime,
        status,
     }
     * @param curVersion
     * @param newVersion
     * @param table_name
     * @returns {*}
     * @private
     */
    static async _onOpen_p2p(curVersion, newVersion, table_name) {
        console.log("_onOpen_p2p:" + " tb_name:" + table_name + " curVersion:" + curVersion + " newVersion:" + newVersion)
        switch (curVersion) {
            case 4: {
                // 为所有数据列[jsonconfig]加密
                let sqlc = `select * from ${table_name}`
                let ret = await SQLiteOpenHelper.executeSql(sqlc)

                if (ret && ret.results.rows.length > 0) {

                    for (let i = 0, len = ret.results.rows.length; i < len; ++i) {
                        let item = ret.results.rows.item(i)

                        // 加密
                        let col_name = 'message'
                        let js = gfuncs.xorEncrypt(item[col_name])

                        let sql = `update ${table_name} set ${col_name}='${js}' where id = ${item.id}`
                        console.log("--------sql:"+ sql)
                        await SQLiteOpenHelper.executeSql(sql)
                    }

                }
            }
                break
            case 3: {
                try {
                    await SQLiteOpenHelper.executeSql(`alter table ${table_name} add column mode int default(0)`)
                } catch (err) {

                    console.warn("createP2PTable" + utils.toString(err))
                    return curVersion + 1
                }
            }
                break
            case 2: {
                try {
                    await SQLiteOpenHelper.executeSql(`alter table ${table_name} add column uuid text default('')`)
                } catch (err) {
                    // todo ht 加好友后第一次创建聊天表 会出现弹框问题，暂没有找到具体什么原因 临时处理为警告
                    // duplicate column name:svrid, uuid, mode 连续点击2次发起聊天创建聊天表时
                    console.warn("createP2PTable" + utils.toString(err))
                    return curVersion + 1
                }
            }
                break
            case 1: {
                try {
                    await SQLiteOpenHelper.executeSql(`alter table ${table_name} add column svrid int default(0)`)
                    await SQLiteOpenHelper.executeSql(`alter table ${table_name} add column createtime int default(0)`)
                    await SQLiteOpenHelper.executeSql(`alter table ${table_name} add column status int default(0)`)
                    await SQLiteOpenHelper.executeSql(`alter table ${table_name} add column message text default('{}')`)
                } catch (err) {
                    console.warn("createP2PTable" + utils.toString(err))
                    return curVersion + 1
                }
            }
                break
            case 0:
            default: {
                try {
                    // presstime 是为阅后即焚准备的  presstime是点击时的时间
                    let sqlc = `create table if not exists ${table_name} (
                                id integer primary key autoincrement not null,
                                userid int,
                                type int,
                                owner int,
                                content text,
                                time timestamp,
                                presstime int
                                );`

                    await SQLiteOpenHelper.executeSql(sqlc)
                } catch (err) {
                    alert("createP2PTable" + utils.toString(err))
                    return curVersion + 1
                }
            }
        }
    }



    static async _onOpen_config(curVersion, newVersion, table_name) {
        switch (curVersion) {
            case 1: {
                // 为所有数据列[jsonconfig]加密
                let sqlc = "select * from Config"
                let ret = await SQLiteOpenHelper.executeSql(sqlc)

                if (ret && ret.results.rows.length > 0) {

                    for (let i = 0, len = ret.results.rows.length; i < len; ++i) {
                        let item = ret.results.rows.item(i)

                        // 加密
                        let js = gfuncs.xorEncrypt(item.jsonconfig)

                        let sql = `update Config set jsonconfig='${js}' where id = ${item.id}`
                        console.log("--------sql:"+ sql)
                        await SQLiteOpenHelper.executeSql(sql)
                    }

                }

            }
                break
            case 0:
            default: {
                let sqlc = `create table if not exists Config (
                        id integer primary key autoincrement not null,
                        jsonconfig text
                        );`
                await SQLiteOpenHelper.executeSql(sqlc)
            }
        }
    }

    static async _onOpen_friend(curVersion, newVersion, table_name) {
        console.log("_onOpen_friend:" + curVersion + " newversion:" + newVersion)
        switch (curVersion) {
            case 1: {

            }
                break
            case 0:
            default: {
                let sqlc = `create table if not exists Friend (
                        id integer primary key autoincrement not null,
                        friendid int,
                        createtime int,
                        jsondetail text
                        );`
                await SQLiteOpenHelper.executeSql(sqlc)
            }
        }
    }

    static async _onOpen_session(curVersion, newVersion, table_name) {
        console.log("_onOpen_session:" + curVersion + " newversion:" + newVersion)
        switch (curVersion) {
            case 1: {

            }
                break
            case 0:
            default: {
                let sqlc = `create table if not exists Session (
                        id int primary key not null,
                        username text default(''),
                        createtime int default(0),
                        unreadcnt int default(0),
                        conintres1 int default(0),
                        conintres2 int default(0),
                        constrres1 text default(''),
                        constrres2 text default('')
                        );`
                await SQLiteOpenHelper.executeSql(sqlc)
            }
        }
    }

}
