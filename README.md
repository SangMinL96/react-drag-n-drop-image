# React Drag and Drop Images

[![Version](http://img.shields.io/npm/v/react-drag-n-drop-image.svg)](https://www.npmjs.org/package/react-drag-n-drop-image)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm download][download-image]][download-url]

[download-image]: https://img.shields.io/npm/dm/react-drag-n-drop-image.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-drag-n-drop-image

drag & drop image file upload library.

## Demo

[![Edit react-drag-n-drop-image](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/SangMinL96/sample-react-drag-n-drop-image/react-drag-n-drop-image?file=%2FREADME.md&selection=%5B%7B%22endColumn%22%3A1%2C%22endLineNumber%22%3A18%2C%22startColumn%22%3A1%2C%22startLineNumber%22%3A18%7D%5D&workspace=%257B%2522activeFileId%2522%253A%2522cldjvmbt9000a8ue2cytkdaw0%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522cldjvmewd001d3b6imbsvgiw9%2522%253A%257B%2522key%2522%253A%2522cldjvmewd001d3b6imbsvgiw9%2522%252C%2522name%2522%253A%2522Default%2522%252C%2522devtools%2522%253A%255B%257B%2522key%2522%253A%2522cldjvo5da001m3b6hvkj625l8%2522%252C%2522type%2522%253A%2522PROJECT_SETUP%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522port%2522%253A3000%252C%2522key%2522%253A%2522cldjvnbuz00jl3b6i7zy2lhn0%2522%252C%2522isMinimized%2522%253Afalse%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522key%2522%253A%2522cldjvn8vt00eh3b6iynw1hrf6%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522cldjvmewd001d3b6imbsvgiw9%2522%252C%2522spacesOrder%2522%253A%255B%2522cldjvmewd001d3b6imbsvgiw9%2522%255D%252C%2522hideCodeEditor%2522%253Afalse%257D)

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
    )
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
