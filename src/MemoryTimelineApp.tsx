import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';

const samplePhotos = [
  { id: '1', year: 2023, month: 'Jan', day: 2, src: 'https://placehold.co/150' },
  { id: '2', year: 2023, month: 'Jan', day: 15, src: 'https://placehold.co/150' },
  { id: '3', year: 2023, month: 'Feb', day: 3, src: 'https://placehold.co/150' },
   { id: '4', year: 2023, month: 'Jan', day: 2, src: 'https://placehold.co/150' },
    { id: '5', year: 2023, month: 'Jan', day: 2, src: 'https://placehold.co/150' },
     { id: '6', year: 2023, month: 'Jan', day: 2, src: 'https://placehold.co/150' },
      { id: '7', year: 2023, month: 'Jan', day: 2, src: 'https://placehold.co/150' },
  // Add more as needed
];

const years = [2021, 2022, 2023];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const daysInMonth = (month: string): number => {
  const idx = months.indexOf(month);
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][idx] || 30;
};

type TimelineState = {
  currentView: 'years' | 'months' | 'days';
  selectedYear: number | null;
  selectedMonth: string | null;
  openYears: number[];
  openMonths: string[];
  setView: (view: TimelineState['currentView']) => void;
  selectYear: (year: number) => void;
  selectMonth: (month: string) => void;
  goBack: () => void;
};

const useTimelineStore = create<TimelineState>((set) => ({
  currentView: 'years',
  selectedYear: null,
  selectedMonth: null,
  openYears: [],
  openMonths: [],
  setView: (view) => set({ currentView: view }),
  selectYear: (year) =>
    set({
      currentView: 'months',
      selectedYear: year,
      selectedMonth: null,
    }),
  selectMonth: (month) =>
    set({
      currentView: 'days',
      selectedMonth: month,
    }),
  goBack: () =>
    set((state) => {
      if (state.currentView === 'days') {
        return { currentView: 'months', selectedMonth: null };
      }
      if (state.currentView === 'months') {
        return { currentView: 'years', selectedYear: null };
      }
      return state;
    }),
}));

export default function MemoryTimelineApp() {
  const { currentView } = useTimelineStore();

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-gray-50">
      <AnimatePresence mode="wait">
        {currentView === 'years' && <YearsView key="years" />}
        {currentView === 'months' && <MonthsView key="months" />}
        {currentView === 'days' && <DaysView key="days" />}
      </AnimatePresence>
    </div>
  );
}

function YearsView() {
  const { selectYear } = useTimelineStore();

  return (
    <motion.div
  key="years"
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 50 }}
  className="flex justify-center items-center w-full h-screen"
>
  <div className="flex gap-12 items-end">
    {years.map((year) => {
      const photos = samplePhotos.filter((p) => p.year === year);
      const hasPhotos = photos.length > 0;
      return (
        <div
          key={year}
          className="flex flex-col items-center justify-end space-y-3 w-[200px] h-[300px] border border-yellow-500"
        >
          <div
            onClick={() => selectYear(year)}
            className="cursor-pointer rounded-lg bg-blue-400 text-white font-bold text-xl flex items-center justify-center px-6 py-4 shadow-lg select-none"
          >
            {year}
          </div>
          
          {hasPhotos && (
                <>
                  {/* Tick (line) */}
                  <div className="w-24 h-24 bg-red-400 my-1" />
                </>
              )}

          {/* Always reserve vertical space even if no photos */}
          <div className="h-[160px] flex items-center justify-center"
                          onClick={() => selectYear(year)}>
            <PhotoStack photos={photos} />
          </div>
        </div>
      );
    })}
  </div>
</motion.div>
  );
}

function MonthsView() {
  const { selectedYear, selectMonth, goBack } = useTimelineStore();

  if (!selectedYear) return null;

  return (
   <motion.div
  key="months"
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.98 }}
  transition={{ duration: 0.4 }}
  className="absolute top-0 left-0 w-full h-full p-6 flex flex-col items-center bg-gray-50 overflow-auto"
>
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
      >
        ← Back to Years
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">{selectedYear}</h2>

      <div className="grid grid-cols-4 gap-6">
        {months.map((month) => {
          const photos = samplePhotos.filter(
            (p) => p.year === selectedYear && p.month === month,
          );
          return (
            <div
              key={month}
              className="cursor-pointer rounded-lg bg-blue-200 p-4 shadow flex flex-col items-center select-none"
              onClick={() => selectMonth(month)}
            >
              <div className="font-semibold mb-3">{month}</div>
              <PhotoStack photos={photos} />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function DaysView() {
  const { selectedYear, selectedMonth, goBack } = useTimelineStore();

  if (!selectedYear || !selectedMonth) return null;

  const photosInMonth = samplePhotos.filter(
    (p) => p.year === selectedYear && p.month === selectedMonth,
  );

  return (
    <motion.div
  key="months"
  initial={{ opacity: 0, scale: 0.98 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.98 }}
  transition={{ duration: 0.4 }}
  className="absolute top-0 left-0 w-full h-full p-6 flex flex-col items-center bg-gray-50 overflow-auto"
>
      <button
        onClick={goBack}
        className="mb-4 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
      >
        ← Back to Months
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center">
        {selectedMonth} {selectedYear}
      </h2>

      <div className="grid grid-cols-7 gap-4">
        {Array.from({ length: daysInMonth(selectedMonth) }, (_, i) => i + 1).map(
          (day) => {
            const photos = photosInMonth.filter((p) => p.day === day);
            return (
              <div
                key={day}
                className="bg-white rounded shadow p-2 flex flex-col items-center min-h-[80px]"
              >
                <div className="font-semibold mb-2">{day}</div>
                <PhotoStack photos={photos} />
              </div>
            );
          },
        )}
      </div>
    </motion.div>
  );
}

function PhotoStack({ photos }: { photos: typeof samplePhotos }) {
  if (photos.length === 0)
    return <div className="text-gray-400 italic text-sm">No photos</div>;

  const size = 160;
  const imgSize = 64;
  const radius = 25;

  const zIndices = [...Array(photos.length).keys()]
    .map((_, i) => i + 1)
    .sort(() => Math.random() - 0.5);

  const rotations = photos.map(() => Math.random() * 50 - 25);

  return (
    <div
       className="relative m-0 p-0 cursor-pointer" style={{ width: size, height: size }}>
      {photos.slice(0, 10).map((photo, i) => {
        const angle = (2 * Math.PI * i) / photos.length;
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;

        return (
          <motion.img
            key={photo.id}
            src={photo.src}
            alt="photo"
            className="absolute rounded object-cover border border-white shadow"
            style={{
              top: '50%',
              left: '50%',
              width: imgSize,
              height: imgSize,
              zIndex: zIndices[i],
              transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) rotate(${rotations[i]}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.02 }}
          />
        );
      })}
    </div>
  );
}
