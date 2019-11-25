# functions_test
Test of netlify function feature

## How to test.

1. Deploy this repository on the Netlify.
2. [Deploys] - [Build settings] - [Edit settings], set ``Base directory``  as ```Netlify```, conirm the ``Publish directory`` is automatically changed also as ```/Netlify```
[!](https://imgur.com/a/R1MKYdA)
2. [Settings] - [Functions] - [Settings], set Functions directory as ``` ./api ```
3. [Trigger deploy]
4. get [site url]/.netlify/functions/hello

