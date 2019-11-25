# functions_test
Test of netlify function feature

## How to test.

1. Deploy this repository on the Netlify.

2. [Deploys] - [Build settings] - [Edit settings], set ``Base directory``  as ```Netlify```, conirm the ``Publish directory`` is automatically changed also as ```/Netlify```
<img src="https://i.imgur.com/5WUHdkO.png">

3. [Settings] - [Functions] - [Settings], set Functions directory as ``` ./api ```

4. [Trigger deploy]

5. get [site url]/.netlify/functions/hello

