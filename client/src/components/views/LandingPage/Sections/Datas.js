const checkBoxData = [
    {
        "_id": 1,
        "name": "낮은가격순",
        "column": "PRICE",
        "keyword": "ASC"
    },
    {
        "_id": 2,
        "name": "높은가격순",
        "column": "PRICE",
        "keyword": "DESC"
    },
    {
        "_id": 3,
        "name": "최신순",
        "column": "REG_DATE",
        "keyword": "DESC"
    }
]

const price = [
    {
        "_id": 0,
        "name": "전체",
        "array": []
    },
    {
        "_id": 1,
        "name": "2만원 이하",
        "array": [0, 20000]
    },
    {
        "_id": 2,
        "name": "2만원~4만원",
        "array": [20000, 40000]
    },
    {
        "_id": 3,
        "name": "4만원~6만원",
        "array": [40000, 60000]
    },
    {
        "_id": 4,
        "name": "6만원~8만원",
        "array": [60000, 80000]
    },
    {
        "_id": 5,
        "name": "8만원 이상",
        "array": [80000, 1000000000]
    }
]




export {
    checkBoxData,
    price
}
