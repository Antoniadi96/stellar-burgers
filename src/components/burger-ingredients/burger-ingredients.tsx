import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BurgerIngredientsUI } from '@ui';
import { useAppSelector } from '../../services/store';
import {
  selectBuns,
  selectMains,
  selectSauces
} from '../../services/selectors/ingredients';
import type { TTabMode } from '@utils-types';

type Tab = 'bun' | 'main' | 'sauce';

export const BurgerIngredients: FC = () => {
  const buns = useAppSelector(selectBuns);
  const mains = useAppSelector(selectMains);
  const sauces = useAppSelector(selectSauces);

  const [currentTab, setCurrentTab] = useState<Tab>('bun');

  const listRef = useRef<HTMLDivElement>(null);

  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const bunSectionRef = useRef<Element | null>(null);
  const mainSectionRef = useRef<Element | null>(null);
  const sauceSectionRef = useRef<Element | null>(null);

  const bunsRef = useCallback((node?: Element | null) => {
    bunSectionRef.current = node ?? null;
  }, []);
  const mainsRef = useCallback((node?: Element | null) => {
    mainSectionRef.current = node ?? null;
  }, []);
  const saucesRef = useCallback((node?: Element | null) => {
    sauceSectionRef.current = node ?? null;
  }, []);

  const tabsRef = useRef<HTMLUListElement>(null);

  const scrollToHeading = useCallback((heading: HTMLElement | null) => {
    const root = listRef.current;
    if (!root || !heading) return;
    const tabsH = tabsRef.current?.getBoundingClientRect().height ?? 0;
    const top = heading.offsetTop - root.offsetTop - tabsH - 40; // 40px — запас
    root.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const onTabClick = useCallback(
    (val: string) => {
      const tab = val as Tab;
      setCurrentTab(tab);
      if (tab === 'bun') scrollToHeading(titleBunRef.current);
      if (tab === 'main') scrollToHeading(titleMainRef.current);
      if (tab === 'sauce') scrollToHeading(titleSaucesRef.current);
    },
    [scrollToHeading]
  );

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;

    const targets = [
      bunSectionRef.current,
      mainSectionRef.current,
      sauceSectionRef.current
    ].filter(Boolean) as Element[];
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
        if (!visible) return;

        if (visible.target === bunSectionRef.current) setCurrentTab('bun');
        if (visible.target === mainSectionRef.current) setCurrentTab('main');
        if (visible.target === sauceSectionRef.current) setCurrentTab('sauce');
      },
      {
        root,
        threshold: 0.3
      }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [buns.length, mains.length, sauces.length]);

  return (
    <BurgerIngredientsUI
      currentTab={currentTab as TTabMode}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      listRef={listRef}
      onTabClick={onTabClick}
    />
  );
};
