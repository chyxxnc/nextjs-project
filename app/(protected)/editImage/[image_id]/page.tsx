'use client';

import * as fabric from 'fabric';
import { useParams } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';

export default function EditImage() {
  const canvasRef = useRef(null);
  const { image_id } = useParams();
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [image, setImage] = useState<fabric.Image | null>(null);

  // canvas 생성
  useEffect(() => {
    console.log('id:', image_id);
    if (!canvasRef.current) return;

    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 700,
    });

    setCanvas(newCanvas);

    return () => {
      newCanvas.dispose();
    };
  }, []);

  // supabase에서 사용자가 클릭한 image_id의 사진 가져오기
  useEffect(() => {
    const userImgData = async () => {
      const supabase = createClient();
      try {
        const { data: imgData, error: imgErr } = await supabase
          .from('image_versions')
          .select('file_path')
          .eq('image_id', image_id)
          .single();

        if (!imgData || imgErr) {
          console.log('이미지를 불러오지 못 함');
          return;
        }
        setImgUrl(imgData.file_path);
      } catch (error) {
        console.log(error);
      }
    };
    userImgData();
  }, [image_id]);

  // 이미지 출력
  useEffect(() => {
    if (canvas && imgUrl) {
      const addImage = async () => {
        try {
          const img = await fabric.Image.fromURL(imgUrl, {
            crossOrigin: 'anonymous',
          });

          const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
          setImage(img);

          img.set({
            scaleX: scale,
            scaleY: scale,
            selectable: false, // 선택되지 않게
            evented: false, // 마우스 인식 못 하게
          });

          canvas.add(img);
          canvas.centerObject(img); // 사진 가운데로
        } catch (error) {
          console.log(error);
        }
      };
      addImage();
    }
  }, [canvas, imgUrl]);

  // 필터 적용
  const filter = async (filterName: string) => {
    if (!image) return;
    image.filters = [];
    try {
      switch (filterName) {
        case 'Grayscale':
          image.filters.push(new fabric.filters.Grayscale());
          break;
        case 'Sepia':
          image.filters.push(new fabric.filters.Sepia());
          break;
        case 'Invert':
          image.filters.push(new fabric.filters.Invert());
          break;
        default:
          break;
      }
      image.applyFilters();
      canvas?.renderAll();
    } catch (error) {
      console.log(error);
    }
  };

  // 텍스트 출력
  useEffect(() => {
    if (canvas) {
      const text = new fabric.IText('텍스트를 입력해주세요', {
        top: 50,
        left: 50,
        fontSize: 20,
      });
      canvas.add(text);
    }
  }, [canvas]);

  return (
    <main className="flex justify-center items-center min-h-screen bg-pink-100 space-x-30">
      <canvas style={{ border: '1px solid pink' }} ref={canvasRef} />
      <div>
        <p className="text-sm mb-2">필터</p>
        <div className="flex space-x-2">
          <Button onClick={() => filter('Grayscale')}>Grayscale</Button>
          <Button onClick={() => filter('Sepia')}>Sepia</Button>
          <Button onClick={() => filter('Invert')}>Invert</Button>
        </div>
      </div>
    </main>
  );
}
