"use client"

import { useState, useEffect } from 'react';
import { getPricingPlans } from '@/actions/get-pricing';
import type { PricingPlanType } from '@/data/pricing-plans';

export function usePricingData() {
  const [data, setData] = useState<PricingPlanType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_KEY = 'pricing_data';
    const EXPIRY_TIME = 2 * 60 * 60 * 1000; // 2 hours

    const fetchAndCache = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);

        if (cached) {
          const { value, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < EXPIRY_TIME) {
            setData(value as PricingPlanType[]);
            setLoading(false);
            return;
          }
        }

        const freshData = await getPricingPlans();

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          value: freshData,
          timestamp: Date.now(),
        }));

        setData(freshData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCache();
  }, []);

  return { data, loading };
}