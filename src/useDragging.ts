import React, { useCallback, useEffect, useState } from 'react';

type PropsType = {
  containerRef: HTMLDivElement | any;
  onChangeFiles: (ev: React.ChangeEvent<HTMLInputElement> | any) => void;
};

function useDragging({ onChangeFiles, containerRef }: PropsType) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles],
  );
  useEffect(() => {
    const ref = containerRef.current;
    if (ref) {
      ref.addEventListener('dragenter', handleDragIn);
      ref.addEventListener('dragleave', handleDragOut);
      ref.addEventListener('dragover', handleDragOver);
      ref.addEventListener('drop', handleDrop);
    }
    return () => {
      ref.removeEventListener('dragenter', handleDragIn);
      ref.removeEventListener('dragleave', handleDragOut);
      ref.removeEventListener('dragover', handleDragOver);
      ref.removeEventListener('drop', handleDrop);
    };
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop, containerRef]);

  return { isDragging };
}

export default useDragging;
