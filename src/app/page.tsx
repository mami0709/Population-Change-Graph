import { Title } from '@/app/components/Title';
import { PrefecturePopulationViewer } from '@/app/components/PrefecturePopulationViewer';
import { getPrefectures } from '@/lib/resasService';

export default async function Home() {
  const prefectures = await getPrefectures();

  return (
    <div>
      <Title />
      <PrefecturePopulationViewer prefectures={prefectures} />
    </div>
  );
}
