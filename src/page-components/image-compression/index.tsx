'use client';
import Icon from '@/components/render/icon';
import { getSize } from '@/util/dataUtil';
import { useMemoizedFn, useMount } from 'ahooks';
import { Upload, InputNumber, Button } from 'antd';
import { useRef, useState } from 'react';
import NImage from 'next/image';

const { Dragger } = Upload;
const ImageCompression: React.FC = () => {
  const [originSrc, setOriginSrc] = useState('');
  const [originSize, setOriginSize] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [resultSrc, setResultSrc] = useState('');
  const [resultSize, setResultSize] = useState(0);
  const [compressRate, setCompressRate] = useState<number | null>(100);
  const originImageRef = useRef(null);
  useMount(() => {
    document.title = '图片压缩';
  });
  const handleUpload = useMemoizedFn((info) => {
    const file = info.file;
    const url = URL.createObjectURL(file);
    setOriginSrc(url);
    setOriginSize(file.size);
    const image = new Image();
    image.src = url;
    // 获取图片的原始高度
    image.onload = () => {
      setImageWidth(image.width);
      setImageHeight(image.height);
    };
  });

  const handleCompress = useMemoizedFn(() => {
    if (!compressRate || compressRate <= 0 || compressRate > 100) {
      window.$error('请输入1-100的数字');
      return;
    }
    const size = originSize * (compressRate / 100);
    drawResultImage(size);
  });

  const drawResultImage = useMemoizedFn((size: number) => {
    const image = originImageRef.current;
    if (!image) {
      return;
    }
    const canvas = document.getElementById('image-deal') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    canvas.width = imageWidth;
    canvas.height = imageHeight;
    context.drawImage(image, 0, 0, imageWidth, imageHeight);
    getImageData([0, 1], size, canvas, (data) => {
      context?.clearRect(0, 0, imageWidth, imageHeight);
      setResultSrc(URL.createObjectURL(data));
      setResultSize(data.size);
    });
  });

  const getImageData = useMemoizedFn((initQuality: [number, number], size: number, canvas: HTMLCanvasElement, callback: (data: Blob) => void) => {
    //通过二分法获取最接近的图片大小
    canvas.toBlob(
      (data) => {
        if (!data) {
          return;
        }
        console.log(data?.size);
        if (Math.abs(data.size - size) < 200) {
          callback(data);
          return;
        }
        if (data.size > size) {
          const last = parseFloat(((initQuality[0] + initQuality[1]) / 2).toFixed(2));
          if (last === initQuality[1] || last === initQuality[0]) {
            callback(data);
            return;
          }
          getImageData([initQuality[0], last], size, canvas, callback);
        } else {
          const prev = parseFloat(((initQuality[0] + initQuality[1]) / 2).toFixed(2));
          if (prev === initQuality[1] || prev === initQuality[0]) {
            callback(data);
            return;
          }
          getImageData([prev, initQuality[1]], size, canvas, callback);
        }
      },
      'image/jpeg',
      (initQuality[0] + initQuality[1]) / 2,
    );
  });

  const handleDownload = useMemoizedFn(() => {
    const el = document.createElement('a');
    // 设置 href 为图片经过 base64 编码后的字符串，默认为 png 格式
    el.href = resultSrc;
    el.download = '';
    el.click();
  });

  return (
    <div className='w-[1000px] bg-white mx-auto h-full p-lg'>
      <h1>图片压缩工具</h1>
      <div className='text-primary my-md'>纯客户端压缩，所有图片不会上传至服务器</div>
      <div className='row-around-start'>
        <div className='w-[400px]'>
          <div className='text-lg mb-lg'>原图</div>
          {!originSrc ? (
            <Dragger
              showUploadList={false}
              accept='image/png, image/jpeg'
              customRequest={(arg) => {
                handleUpload(arg);
              }}>
              <div className='col-center-center h-[300px]'>
                <Icon type='imageUpload' className='text-[30px] text-primary'></Icon>
                <div className='text-primary'>点击或拖拽上传图片</div>
              </div>
            </Dragger>
          ) : (
            <div className='col-start-center'>
              <div className='relative'>
                <Icon
                  type='circleClose'
                  className='text-error absolute right-12 top-12 cursor-pointer'
                  onClick={() => {
                    setOriginSrc('');
                    setResultSrc('');
                  }}></Icon>
                <NImage
                  alt=''
                  width={imageWidth}
                  height={imageHeight}
                  src={originSrc}
                  ref={originImageRef}
                  className='!w-[400px]'
                  style={{
                    height: imageHeight * (400 / imageWidth),
                  }}></NImage>
              </div>
              <div className='mt-sm'>图片大小：{getSize(originSize)}</div>
            </div>
          )}
        </div>
        <div className='w-[400px]'>
          <div className='text-lg mb-lg'>处理后图片</div>
          {resultSrc ? (
            <div className='col-start-center'>
              <NImage
                alt=''
                width={imageWidth}
                height={imageHeight}
                src={resultSrc}
                className='!w-[400px]'
                style={{
                  height: imageHeight * (400 / imageWidth),
                }}></NImage>
              <div className='mt-sm'>
                <span>图片大小：{getSize(resultSize)}</span>
                <Button type='link' onClick={handleDownload}>
                  下载图片
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className='row-center-center w-full mt-lg'>
        <span>图片压缩（%）</span>
        <InputNumber
          className='ml-md'
          value={compressRate}
          onChange={(value) => {
            setCompressRate(value);
          }}></InputNumber>
        <Button className='ml-md' type='primary' onClick={handleCompress} disabled={!originSrc}>
          开始压缩
        </Button>
      </div>
      <canvas id='image-deal' className='hidden'></canvas>
    </div>
  );
};

export default ImageCompression;
