# axios-relize

Self-realizing an axios

## flow chart

![axios-flor-chart](http://qiniu.sevenyuan.cn/axios-flow-chart.png)

## Installing

Using npm:

```bash
npm install axios
```

Using bower:

```bash
bower install axios
```

Using yarn:

```bash
yarn add axios
```

## how to use

```js
// Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'franki',
    lastName: 'jogh'
  }
});
```

```js
// GET a request
axios({
  method: 'get',
  url: 'http://sofun',
})
  .then(function (response) {
    console.log(response)
  });
```

## license

MIT
