import { Title } from '@/app/(home)/components/Title';
import { PrefecturePopulationViewer } from '@/app/(home)/components/PrefecturePopulationViewer';
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
