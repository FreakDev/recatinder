var data = [];
var current = 0;

export default {
    load(_data) {
        data = _data
    },
    current() {
        current++
        return data[current - 1] || null
    },
    next() {
        return data[current] || null
    }
} 