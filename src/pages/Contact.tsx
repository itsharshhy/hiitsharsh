import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import Page from '../components/Page';
import { site } from '../content/site';
import { socials } from '../content/socials';

export default function Contact() {
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const list = socials();

  // No server needed: the letter opens in the visitor's own email app, already written.
  const send = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Hello from ${name || 'a visitor'} 💌`);
    const body = encodeURIComponent(`${msg}\n\n— ${name}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  return (
    <Page title={`Contact · ${site.firstName}'s Archive`} className="contact">
      <header className="contact__head">
        <h1>Send me a letter</h1>
        <p className="scribble">for work, collabs, or just to say you liked the cherries.</p>
      </header>

      <div className="contact__grid">
        <div className="mail">
          <motion.div
            className="mail__flap"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 180 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
            aria-hidden="true"
          />
          <div className="mail__back" aria-hidden="true" />
          <motion.form
            className="letter"
            onSubmit={send}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, type: 'spring', stiffness: 90, damping: 14 }}
          >
            <p className="letter__dear">Dear {site.firstName},</p>
            <label>
              <span>my name is</span>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" required autoComplete="name" />
            </label>
            <label>
              <span>and I wanted to say</span>
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="something nice…" rows={5} required />
            </label>
            {site.email ? (
              <button className="btn btn--ink" type="submit">seal & send ✉</button>
            ) : (
              <p className="letter__soon">(the post box opens soon — email coming!)</p>
            )}
          </motion.form>
          <div className="mail__front" aria-hidden="true" />
        </div>

        <aside className="stamps" aria-label="Other ways to reach me">
          <h2>or find me here</h2>
          <ul>
            {list.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0, rotate: (i % 2 ? 1 : -1) * 2 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ rotate: 0, scale: 1.03 }}
              >
                <a href={s.href} target={s.external ? '_blank' : undefined} rel="noreferrer" className="stamp">
                  <span className="stamp__label">{s.label}</span>
                  <span className="stamp__value">{s.value}</span>
                </a>
              </motion.li>
            ))}
          </ul>
          {site.email && (
            <button className="btn btn--ghost-ink" onClick={copy}>
              {copied ? 'copied! ✓' : 'copy my email'}
            </button>
          )}
          <p className="stamps__where">📍 {site.location}</p>
        </aside>
      </div>
    </Page>
  );
}
