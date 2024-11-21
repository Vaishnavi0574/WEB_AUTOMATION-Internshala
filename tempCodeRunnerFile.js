await tab.waitForSelector(".textarea .form-control", { visible: true });
    // let ans = await tab.$$(".textarea .form-control");

    // for (let i = 0; i < ans.length; i++) {
    //     if (i == 0) {
    //         await ans[i].type(data["hiringReason"]);
            
    //         await new Promise(function (resolve, reject) {
    //             return setTimeout(resolve, 1000);
    //         });
    //     }
    //     else if (i == 1) {
    //         await ans[i].type(data["availability"]);
    //         await new Promise(function (resolve, reject) {
    //             return setTimeout(resolve, 1000);
    //         });
    //     }
    //     else {
    //         await ans[i].type(data["rating"]);
    //         await new Promise(function (resolve, reject) {
    //             return setTimeout(resolve, 1000);
    //         });
    //     }
    // }