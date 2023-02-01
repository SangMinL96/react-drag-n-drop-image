# React Drag and Drop Images

[![Version](http://img.shields.io/npm/v/react-drag-n-drop-image.svg)](https://www.npmjs.org/package/react-drag-n-drop-image)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm download][download-image]][download-url]

[download-image]: https://img.shields.io/npm/dm/react-drag-n-drop-image.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-drag-n-drop-image

drag & drop image file upload library.

## Demo

[![Edit react-drag-n-drop-image](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-drag-n-drop-image-m5lye2?file=/src/App.js)

## Installation

Install it from npm (using [NPM](http://webpack.github.io/)).

```bash
npm i --save react-drag-n-drop-image
```

or:

```bash
yarn add react-drag-n-drop-image
```

## Usage

Using react component just as simple as:

```jsx static
import React, { useState } from 'react';
import FileUpload from 'react-drag-n-drop-image';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const onChange = file => {
    setFiles(file);
  };
  const onRemoveImage = id => {
    setFiles(prev => prev.filter(i => i.id !== id));
  };
  const onError = error => {
    console.error(error);
  };
  return (
    <div>
      <FileUpload onError={onError} body={<CustomBody />} overlap={false} fileValue={files} onChange={onChange} />
      <div className='upload-image-box'>
        {files.map(item => {
          return (
            <div onClick={() => onRemoveImage(item.id)} aria-hidden style={{ width: 150, height: 150, margin: 10 }} key={item.id}>
              <img style={{ width: 150, height: 150 }} src={item.preview} alt='images' />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FileUpload;
```

## drag in box css

```jsx static
  .dragging {
      background-color: red;
  }
```

## Options

| Option      | Type        | Description                  | value example                                 |
| ----------- | ----------- | ---------------------------- | --------------------------------------------- |
| onChange    | Fn          | file upload onChange Event   | `const onChange = (files) => {}`              |
| fileValue   | Array       | file state value             | `[{ id: string, file:File, preview:string }]` |
| body        | JSX Element | jsx                          | `<div>Drag & Drop</div>`                      |
| loadingBody | JSX ELement | jsx                          | `<div>...Loading</div>`                       |
| maxSize     | Number      | size(MB)                     | `defalut maxSize=5`                           |
| onError     | Fn          | type, maxSize, overlab Error | `const onError = (error) => {}`               |
| type        | Array       | image type                   | `defalut type = ['jpg', 'jpeg', 'png']`       |
| overlap     | Boolean     | overlap true or false        | `defalut overlap = true`                      |
| className   | String      | container div className      | ``                                            |

## License

[MIT](https://choosealicense.com/licenses/mit/)
