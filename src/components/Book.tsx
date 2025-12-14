import HTMLFlipBook from "react-pageflip";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";

interface BookProps {
    pages: string[];
    audioPages?: { pageIndex: number; audioSrc: string; title?: string }[];
    onLastPageReached?: () => void;
}

export function Book({ pages, audioPages, onLastPageReached }: BookProps) {
    const bookRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [hasReachedLastPage, setHasReachedLastPage] = useState(false);

    const goToNextPage = () => {
        bookRef.current?.pageFlip().flipNext();
    };

    const goToPreviousPage = () => {
        bookRef.current?.pageFlip().flipPrev();
    };

    const goToPage = (pageNumber: number) => {
        bookRef.current?.pageFlip().flip(pageNumber);
    };

    const handleFlip = (e: any) => {
        const newPage = e.data;
        setCurrentPage(newPage);

        // Check if user reached the last page
        if (newPage === pages.length - 1 && !hasReachedLastPage) {
            setHasReachedLastPage(true);
            // Use setTimeout to defer the callback to avoid synchronous setState
            if (onLastPageReached) {
                setTimeout(() => {
                    onLastPageReached();
                }, 0);
            }
        }
    };



    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="relative w-full max-w-4xl flex justify-center items-center">
                <HTMLFlipBook
                    width={1969}
                    height={1576}
                    size="stretch"
                    minWidth={550} 
                    maxWidth={1500}
                    minHeight={400}
                    maxHeight={1576}
                    maxShadowOpacity={0.5}
                    showCover={false}
                    mobileScrollSupport={false}
                    className="shadow-2xl mx-auto"
                    ref={bookRef}
                    onFlip={handleFlip}
                    useMouseEvents={true}
                    clickEventForward={true}
                    swipeDistance={30}
                    drawShadow={true}
                    flippingTime={300}
                    usePortrait={true}
                    startPage={0}
                    autoSize={true}
                    startZIndex={0}
                    showPageCorners={false}
                    disableFlipByClick={false}
                    style={{ margin: '0 auto' }}
                >
                    {pages.map((imagePath, index) => (
                        <div key={index} className="page bg-white">
                            <div className="h-full w-full flex items-center justify-center">
                                <img 
                                    src={imagePath} 
                                    alt={`Página ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </HTMLFlipBook>

                {/* Page Counter Overlay */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg pointer-events-none z-10">
                    <span className="font-medium">
                        {currentPage + 1} / {pages.length}
                    </span>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 w-full flex-wrap">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-500"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                </button>

                <div className="flex items-center gap-2 flex-wrap justify-center max-w-md">
                    {pages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToPage(index)}
                            className={`transition-all rounded-full ${
                                index === currentPage
                                    ? 'bg-green-500 w-8 h-3'
                                    : 'bg-gray-300 hover:bg-gray-400 w-3 h-3'
                            }`}
                            title={`Página ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={goToNextPage}
                    disabled={currentPage === pages.length - 1}
                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-500"
                >
                    Próxima
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Audio Player for Current Page */}
            {audioPages && audioPages.find(ap => ap.pageIndex === currentPage) && (
                <div className="w-full max-w-3xl -mt-2">
                    <AudioPlayer 
                        src={audioPages.find(ap => ap.pageIndex === currentPage)!.audioSrc}
                        title={audioPages.find(ap => ap.pageIndex === currentPage)!.title}
                    />
                </div>
            )}

            {/* Last Page Reached Indicator */}
                {hasReachedLastPage && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-10">
                        <span className="font-medium">
                            ✓ Você completou todas as páginas!
                        </span>
                    </div>
                )}

            
        </div>
    );
}