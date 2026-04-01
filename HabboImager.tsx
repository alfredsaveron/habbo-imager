'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './HabboImager.module.css';
import { User, Copy, Download, ArrowDown, ArrowDownLeft, ArrowLeft, ArrowUpLeft, ArrowUp, ArrowUpRight, ArrowRight, ArrowDownRight, Image as ImageIcon, Ruler, Flame, ArrowUpDown, Smile } from 'lucide-react';

export default function HabboImager() {
  const [username, setUsername] = useState('Bailed');
  const [size, setSize] = useState('l');
  const [action, setAction] = useState('');
  const [direction, setDirection] = useState('2');
  const [headDirection, setHeadDirection] = useState('2');
  const [gesture, setGesture] = useState('std');

  const [imageUrl, setImageUrl] = useState('');
  const prevImageUrlRef = useRef('');

  const buildAvatarUrl = () => {
    let base = `https://www.habbo.com/habbo-imaging/avatarimage?`;
    let params = new URLSearchParams();

    params.append('user', username || 'Bailed');
    if (action) params.append('action', action);
    if (direction) params.append('direction', direction);
    if (headDirection) params.append('head_direction', headDirection);
    params.append('img_format', 'png');
    if (gesture) params.append('gesture', gesture);
    params.append('headonly', '0');
    if (size) params.append('size', size);

    return base + params.toString();
  };

  useEffect(() => {
    const newUrl = buildAvatarUrl();
    setImageUrl(newUrl);
    prevImageUrlRef.current = newUrl;
  }, [username, size, action, direction, headDirection, gesture]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(imageUrl);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `habbo_avatar_${username || 'Bailed'}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error while downloading avatar. Trying direct link:', error);
      window.open(imageUrl, '_blank');
    }
  };

  const DirectionPad = ({ value, onChange, label, includeSame = false }: { value: string, onChange: (val: string) => void, label: string, includeSame?: boolean }) => {
    const directions = [
      { icon: <ArrowDown size={16} />, val: '3', title: 'Front' },
      { icon: <ArrowDownLeft size={16} />, val: '4', title: 'Front Left' },
      { icon: <ArrowLeft size={16} />, val: '5', title: 'Left' },
      { icon: <ArrowUpLeft size={16} />, val: '6', title: 'Back Left' },
      { icon: <ArrowUp size={16} />, val: '7', title: 'Back' },
      { icon: <ArrowUpRight size={16} />, val: '8', title: 'Back Right' },
      { icon: <ArrowRight size={16} />, val: '1', title: 'Right' },
      { icon: <ArrowDownRight size={16} />, val: '2', title: 'Front Right' },
    ];

    return (
      <div className={styles.sectionBox}>
        <div className={styles.sectionHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={16} style={{ color: '#a1a1aa' }} />
            <span className={styles.sectionTitle}>{label}</span>
          </div>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.directionGrid}>
            {includeSame && (
              <button
                className={`${styles.iconBtn} ${value === '' ? styles.iconBtnActive : ''}`}
                onClick={() => onChange('')}
                title="Same as body"
              >
                Same
              </button>
            )}
            {directions.map((dir, i) => (
              <button
                key={i}
                className={`${styles.iconBtn} ${value === dir.val ? styles.iconBtnActive : ''}`}
                onClick={() => onChange(dir.val)}
                title={dir.title}
              >
                {dir.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>
          <span style={{ color: '#fff' }}>Avatar </span>
          <span className={styles.gradientText}>Imager</span>
        </h1>
        <p className={styles.subtitle}>
          To view, customize and download Habbo avatars!
        </p>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.controlsSection}>

          <div className={styles.sectionBox}>
            <div className={styles.sectionHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} style={{ color: '#a1a1aa' }} />
                <span className={styles.sectionTitle}>USERNAME</span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              <form
                onSubmit={(e) => e.preventDefault()}
                style={{ display: 'flex', gap: '8px' }}
              >
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username..."
                  maxLength={15}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color, rgba(255,255,255,0.1))',
                    background: '#0d0d0d',
                    color: '#fff',
                    outline: 'none',
                    height: '38px',
                    fontSize: '0.95rem'
                  }}
                />
              </form>
            </div>
          </div>

          <div className={styles.twoColumnGrid}>
            <div className={styles.sectionBox}>
              <div className={styles.sectionHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Ruler size={16} style={{ color: '#a1a1aa' }} />
                  <span className={styles.sectionTitle}>SIZE</span>
                </div>
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.btnGrid}>
                  <button className={`${styles.optionBtn} ${size === 's' ? styles.optionBtnActive : ''}`} onClick={() => setSize('s')}>Small</button>
                  <button className={`${styles.optionBtn} ${size === 'm' ? styles.optionBtnActive : ''}`} onClick={() => setSize('m')}>Normal</button>
                  <button className={`${styles.optionBtn} ${size === 'l' ? styles.optionBtnActive : ''}`} onClick={() => setSize('l')}>Large</button>
                </div>
              </div>
            </div>

            <div className={styles.sectionBox}>
              <div className={styles.sectionHeader}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flame size={16} style={{ color: '#a1a1aa' }} />
                  <span className={styles.sectionTitle}>ACTION</span>
                </div>
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.btnGrid}>
                  <button className={`${styles.optionBtn} ${action === 'wlk' ? styles.optionBtnActive : ''}`} onClick={() => setAction(action === 'wlk' ? '' : 'wlk')}>Walk</button>
                  <button className={`${styles.optionBtn} ${action === 'sit' ? styles.optionBtnActive : ''}`} onClick={() => setAction(action === 'sit' ? '' : 'sit')}>Sit</button>
                  <button className={`${styles.optionBtn} ${action === 'wav' ? styles.optionBtnActive : ''}`} onClick={() => setAction(action === 'wav' ? '' : 'wav')}>Wave</button>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.twoColumnGrid}>
            <DirectionPad value={direction} onChange={setDirection} label="BODY DIRECTION" />
            <DirectionPad value={headDirection} onChange={setHeadDirection} label="HEAD DIRECTION" includeSame={false} />
          </div>

          <div className={styles.sectionBox}>
            <div className={styles.sectionHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smile size={16} style={{ color: '#a1a1aa' }} />
                <span className={styles.sectionTitle}>GESTURE</span>
              </div>
            </div>
            <div className={styles.sectionContent}>
              <div className={styles.gestureGrid}>
                <button className={`${styles.optionBtn} ${gesture === 'std' ? styles.optionBtnActive : ''}`} onClick={() => setGesture('std')}>Normal</button>
                <button className={`${styles.optionBtn} ${gesture === 'sml' ? styles.optionBtnActive : ''}`} onClick={() => setGesture('sml')}>Smile</button>
                <button className={`${styles.optionBtn} ${gesture === 'sad' ? styles.optionBtnActive : ''}`} onClick={() => setGesture('sad')}>Sad</button>
                <button className={`${styles.optionBtn} ${gesture === 'ang' ? styles.optionBtnActive : ''}`} onClick={() => setGesture('ang')}>Angry</button>
                <button className={`${styles.optionBtn} ${gesture === 'eyb' ? styles.optionBtnActive : ''}`} onClick={() => setGesture('eyb')}>Eyes Closed</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.previewSection}>
          <div className={styles.sectionBox} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className={styles.sectionHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ImageIcon size={16} style={{ color: '#a1a1aa' }} />
                <span className={styles.sectionTitle}>PREVIEW</span>
              </div>
              <button className={styles.downloadIconBtn} onClick={handleDownload} title="Download Image">
                <Download size={18} />
              </button>
            </div>

            <div className={styles.sectionContent} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className={styles.avatarBoxWrapper}>
                <div className={styles.avatarBox}>
                  {imageUrl ? (
                    <img src={imageUrl} alt="Avatar Preview" className={styles.avatarImage} />
                  ) : (
                    <div className={styles.loadingSpinner}>Loading...</div>
                  )}
                </div>
              </div>

              <div className={styles.actionsBox}>
                <div className={styles.urlRow}>
                  <input type="text" readOnly value={imageUrl} className={styles.urlInput} />
                  <button className={styles.copyBtn} onClick={handleCopyUrl} title="Copy Link">
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
