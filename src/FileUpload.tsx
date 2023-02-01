import React, { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useDragging from './useDragging';
import { checkType, getFileSizeMB, isOverlabFile } from './util';

interface IFileTypes {
  id: string;
  file: File;
  preview?: string;
}
type PropsTypes = {
  onChange: (files: IFileTypes[] | any) => void;
  fileValue: IFileTypes[] | any;
  body?: React.ReactElement;
  loadingBody?: React.ReactElement;
  maxSize?: number;
  onError?: (error: string) => void;
  type?: string[];
  overlap?: boolean;
  className?: string;
};
function FileUpload({
  onChange,
  fileValue,
  body,
  loadingBody,
  maxSize = 5,
  onError,
  type = ['jpg', 'jpeg', 'png'],
  overlap = true,
  className = '',
}: PropsTypes) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onChangeFiles = (ev: React.ChangeEvent<HTMLInputElement> | any) => {
    if (isLoading) return;
    let isError = false;
    ev.preventDefault();
    ev.stopPropagation();
    setIsLoading(true);
    let selectFiles: File[] = [];
    let tempFiles: IFileTypes[] = [];
    if (ev.type === 'drop') {
      selectFiles = ev.dataTransfer.files;
    } else {
      selectFiles = ev.target.files;
    }

    for (let i = 0; i < selectFiles.length; i++) {
      const file = selectFiles[i];
      if (!checkType(file, type)) {
        isError = true;
        if (onError) onError('typeError');
      }
      if (maxSize && getFileSizeMB(file.size) > maxSize) {
        isError = true;
        if (onError) onError('maxSizeError');
      }
      if (!overlap && isOverlabFile(fileValue, file)) {
        isError = true;
        if (onError) onError('overlabError');
      }
      const preview = URL.createObjectURL(file);
      tempFiles = [...tempFiles, { id: `${uuidv4()}`, file, preview }];
    }
    if (isError) {
      setIsLoading(false);
    } else {
      onChange([...fileValue, tempFiles].flat());
      setIsLoading(false);
    }
    inputRef.current.value = null;
  };
  const { isDragging } = useDragging({ onChangeFiles, containerRef });
  const setClassName = `${className} file_container${isDragging ? ' dragging' : ''}`;

  return (
    <div
      ref={containerRef}
      className={setClassName}
      aria-hidden
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
      }}
      onClick={() => isLoading && inputRef && inputRef.current.click()}
    >
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <input ref={inputRef} multiple style={{ display: 'none' }} type='file' accept='image/*' onChange={onChangeFiles} />
      <div className={`file_container${isDragging ? ' dragging' : ''}`}>
        {isLoading && loadingBody}
        {!isLoading &&
          (body ? (
            (body as React.ReactElement | any)
          ) : (
            <div className='temp_body' style={{ fontSize: 17, fontWeight: 700 }}>
              Drag & Drop
            </div>
          ))}
      </div>
    </div>
  );
}

export default FileUpload;
