```javascript

const obj = new ApiClientPrestashop('YOUR_API_KEY', 'http://192.168.99.100:8080');

obj.getAvailablesEndpoint().then(response => {
    console.log(response);
}).catch(error => {
    console.error(error);
})

obj.get('products/1').then(response => {
    console.log(response);
}).catch(error => {
    console.error(error);
});

```