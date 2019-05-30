const hello = 'hello';
const helloObj = {
  hello
};
const sayHello = (obj) => {
  console.log(obj.hello);
};
sayHello(helloObj);