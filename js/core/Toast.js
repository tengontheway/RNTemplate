/**
 * Created by evilcode on 2017/12/6.
 * Toast定制版
 */
import Toast from 'react-native-root-toast'


let {
    durations,
    positions
} = Toast

const new_durations = {
    LONG: 2000,
    SHORT: 500
}

let defaultOptions = {
    LONG: 2000,
    SHORT: 500,
    position: positions.BOTTOM,
    duration: this.SHORT
}

const CToast = {
    /**
     *
     * @param options 默认属性
     */
    setDefaultOptions(options) {
        defaultOptions = {
            ...defaultOptions,
            ...options
        }
    },

    _show(text, position, duration, offY = 0, options = {}) {
        let opt = {
            ...defaultOptions,
            position,
            duration,
            ...options
        }
        opt.position = opt.position + offY

        Toast.show(text, opt)
    },

    showTopShort(text, offY = 0, options = {}) {
        this._show(text, positions.TOP, defaultOptions.SHORT, offY, options)
    },

    showCenterShort(text, offY = 0, options = {}) {
        this._show(text, positions.CENTER, defaultOptions.SHORT, offY, options)
    },

    showBottomShort(text, offY = 0, options = {}) {
        this._show(text, positions.BOTTOM, defaultOptions.SHORT, offY, options)
    },

    showTopLong(text, offY = 0, options = {}) {
        this._show(text, positions.TOP, defaultOptions.LONG, offY, options)
    },

    showCenterLong(text, offY = 0, options = {}) {
        this._show(text, positions.CENTER, defaultOptions.LONG, offY, options)
    },

    showBottomLong(text, offY = 0, options = {}) {
        this._show(text, positions.BOTTOM, defaultOptions.LONG, offY, options)
    },

    show(text, offY = 0, options = {}) {
        this.showBottomShort(text, offY, options)
    }
}

export default CToast