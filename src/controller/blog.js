const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: "标题A",
            content: "内容A",
            createTime: 1608207320114,
            author: "jinshuo",
        },
        {
            id: 2,
            title: "标题B",
            content: "内容B",
            createTime: 1608207334197,
            author: "LiMengYing",
        },
    ];
};

const getDetail = (id) => {
    return {
        id: 1,
        title: "标题A",
        content: "内容A",
        createTime: 1608207320114,
        author: "jinshuo",
    };
};

module.exports = {
    getList,
    getDetail,
};
