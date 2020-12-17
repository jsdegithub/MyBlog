const axios = require("axios");
axios
    .get(
        "https://www.baidu.com/sugrec?prod=pc_his&from=pc_web&json=1&sid=1420_31254_32973_33199_22157&hisdata=&_t=1608010849359&req=2&csor=0"
    )
    .then((res) => {
        console.log(res.data);
    });


    