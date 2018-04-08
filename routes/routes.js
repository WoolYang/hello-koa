const fs = require('fs');
const join = require('path').join;
const Router = require('koa-router');
const routerPath = require('./routerPath');
const router = new Router();


router.post('/xxx/web/*', async (ctx, next) => {
    let jsonData
    routerPath.forEach(item => {
        if (item.path === ctx.request.url) {
            jsonData = getFile(item)
        }
    });
    ctx.body = JSON.parse(jsonData)
});

//操作json文件
const getFile = (option) => {
    const data = fs.readFileSync(`./api/${option.file}/${option.name}.json`, 'utf8', (err, data) => data);
    return data
}

/* const findSyncDir = (startPath, fullPath) => {
    const files = fs.readdirSync(startPath); //获取文件夹名称
    let name
    files.forEach(item => {
        if (new RegExp(item, "g").test(fullPath)) {
            name = item
        }
    });
    return name
}
 */
/* function findSync(startPath) {
    let result = [];
    function finder(path) {
        let files = fs.readdirSync(path);
        console.log(files)
        files.forEach((val, index) => {
            let fPath = join(path, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile()) result.push(fPath);
        });

    }
    finder(startPath);
    return result;
} */
module.exports = router;