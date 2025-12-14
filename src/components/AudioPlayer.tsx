import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
    src: string;
    title?: string;
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const time = parseFloat(e.target.value);
        audio.currentTime = time;
        setCurrentTime(time);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const vol = parseFloat(e.target.value);
        audio.volume = vol;
        setVolume(vol);
        setIsMuted(vol === 0);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMuted) {
            audio.volume = volume || 0.5;
            setVolume(volume || 0.5);
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full">
            <audio ref={audioRef} src={src} preload="metadata" />
            
            {title && (
                <div className="mb-3 text-center">
                    <span className="text-slate-700 font-medium text-sm">🎵 {title}</span>
                </div>
            )}

            {/* Main Controls - Play Button and Progress Bar */}
            <div className="flex items-center gap-4 mb-2">
                    {/* Play/Pause Button */}
                    <button
                        onClick={togglePlay}
                        className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors shadow-md"
                        aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
                    >
                        {isPlaying ? (
                            <Pause className="w-5 h-5" fill="currentColor" />
                        ) : (
                            <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                        )}
                    </button>

                    {/* Progress Bar */}
                    <div className="flex-1">
                        <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer audio-slider"
                            style={{
                                background: `linear-gradient(to right, #10b981 0%, #10b981 ${(currentTime / duration) * 100}%, #bbf7d0 ${(currentTime / duration) * 100}%, #bbf7d0 100%)`
                            }}
                        />
                    </div>

                    {/* Time Display */}
                    <div className="flex-shrink-0 text-xs text-slate-600 font-medium min-w-[80px] text-right">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                </div>

                {/* Volume Controls - Compact Row */}
                <div className="flex items-center justify-end gap-2 px-1">
                    <button
                        onClick={toggleMute}
                        className="text-slate-500 hover:text-green-600 transition-colors"
                        aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
                    >
                        {isMuted || volume === 0 ? (
                            <VolumeX className="w-4 h-4" />
                        ) : (
                            <Volume2 className="w-4 h-4" />
                        )}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1.5 bg-green-200 rounded-lg appearance-none cursor-pointer audio-slider"
                        style={{
                            background: `linear-gradient(to right, #10b981 0%, #10b981 ${(isMuted ? 0 : volume) * 100}%, #bbf7d0 ${(isMuted ? 0 : volume) * 100}%, #bbf7d0 100%)`
                        }}
                    />
                </div>
        </div>
    );
}
