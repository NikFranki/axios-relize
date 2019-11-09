axios.defaults.timeout = 5000;
axios.interceptors.request.use(
    function(config) {
        console.log('request interceptor: ', config);
        return config;
    },
    function(error) {
        console.log('request interceptor: ', error);
    }
);

axios.interceptors.response.use(
    function(res) {
        console.log('response interceptor: ', res);
        return res;
    },
    function(error) {
        console.log('response interceptor: ', error);
    }
);

axios({
    url: 'http://platforms-test.makeblock.com/api/course/2744?ClientType=web',
    method: 'get'
}).then(res => {
    const result = JSON.parse(res.data);
    let con = document.getElementById('content');
    con.innerHTML = JSON.stringify(result.data);
});
// axios.request({
//     url: 'http://platforms-test.makeblock.com/api/course/2744?ClientType=web',
//     method: 'get'
// }).then((res) => {
//     const result = JSON.parse(res.data);
//     let con = document.getElementById('content');
//     con.innerHTML = JSON.stringify(result.data);
// });
