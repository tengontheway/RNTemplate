/**
 * SQLite的简单封装，主要用来实现ES7的async和await功能
 * github: https://github.com/andpor/react-native-sqlite-storage
 *
 * Added by EvilCode.Teng
 */
var SQLite = require('react-native-sqlite-storage');

export default class SQLiteWrapper
{
    /**
     * 打开数据库
     * await SQLiteWrapper.openDatabase({name: `${md5_name}/db/mm.db`, location: `Documents`})
     * @param param
     * @returns {Promise}
     */
    static openDatabase(param) {
        return new Promise((resolve, reject) => {
            let db = SQLite.openDatabase(param,
                (...params)=> {
                    resolve(db, ...params)
                },
                (...params)=> {
                    reject(...params)
                }
            )
        })
    }

    static transaction(db) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                resolve(tx)
            })
        })
    }

    static executeSql(tx, sqlc, values=[]) {
        return new Promise((resolve, reject) => {
            tx.executeSql(sqlc, values,
                (tx, results) => {
                    resolve({tx, results})
                },
                (error) => {
                    reject(error)
                }
            )
        })
    }

    static Sleep()  {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(123);
            }, 2000);
        });
    };
}