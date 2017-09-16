var data = [];
var current = 0;

export default {
    load(_data) {
        data = _data
    },
    current() {
        return data[current] || null
    },
    next() {
        current++
        if (current >= data.length) {
            current = 0
        }
        return data[current] || null
    }
} 