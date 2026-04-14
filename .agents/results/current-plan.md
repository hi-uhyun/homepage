# Hiuhyun Portfolio Homepage — Task Plan

## 개요
프리랜서 성우/배우/가수 포트폴리오 홈페이지. Next.js 15 정적 사이트.

## 기술 스택
Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript + next-intl (ko/en) + Vercel + Cloudflare

---

## Task Board

### Priority 1 — 기반 (병렬 가능)

| ID | Task | Agent | Complexity | Dependencies |
|----|------|-------|------------|--------------|
| task-1 | 프로젝트 초기 설정 (Next.js + Tailwind + i18n) | frontend | Medium | — |
| task-2 | 데이터 스키마 + JSON 파일 구조 | frontend | Low | — |

### Priority 2 — 페이지 구현 (병렬 가능, task-1/2 완료 후)

| ID | Task | Agent | Complexity | Dependencies |
|----|------|-------|------------|--------------|
| task-3 | 공통 레이아웃 + 네비게이션 | frontend | Medium | task-1, task-2 |
| task-4 | 메인 페이지 — Hero + About 요약 | frontend | Medium | task-1, task-2 |
| task-5 | 메인 페이지 — Portfolio Preview + Schedule + Contact | frontend | Medium | task-1, task-2 |
| task-6 | /portfolio 포트폴리오 페이지 | frontend | High | task-1, task-2 |
| task-7 | /about 상세 프로필 페이지 | frontend | Medium | task-1, task-2 |
| task-8 | /schedule 일정 페이지 (Calendly + 카톡) | frontend | High | task-1 |

### Priority 3 — SEO + Analytics + 배포

| ID | Task | Agent | Complexity | Dependencies |
|----|------|-------|------------|--------------|
| task-9 | SEO + 메타 태그 + JSON-LD | frontend | Medium | task-4~8 |
| task-10 | Analytics 설정 (GA + Vercel) | frontend | Low | task-1 |
| task-11 | Vercel 배포 + Cloudflare 도메인 | frontend | Low | task-9, task-10 |

### Priority 4 — QA

| ID | Task | Agent | Complexity | Dependencies |
|----|------|-------|------------|--------------|
| task-12 | 최종 QA — 성능 + 접근성 + 크로스 브라우저 | qa | Medium | task-11 |

---

## 데이터 모델

### PortfolioItem
```typescript
{
  id: string
  title_ko: string
  title_en: string
  category: 'voice-acting' | 'acting' | 'singing'
  tone: string | null        // voice-acting only: 도도한, 다정한, 내레이션 등
  youtubeUrl: string
  thumbnailUrl: string
  isFeatured: boolean
  year: number
  description_ko: string | null
  description_en: string | null
}
```

### Profile
```typescript
{
  name_ko: string
  name_en: string
  tagline_ko: string
  tagline_en: string
  bio_ko: string
  bio_en: string
  profileImageUrl: string
  demoReelUrl: string
  career: { year: number, title_ko: string, title_en: string }[]
  awards: { year: number, title_ko: string, title_en: string }[]
  mediaClippings: { title: string, url: string, source: string, date: string }[]
  sns: { youtube: string, instagram: string, kakaoOpenChat: string, email: string }
}
```

### ScheduleEvent
```typescript
{
  id: string
  title_ko: string
  title_en: string
  date: string              // ISO 8601
  location_ko: string | null
  location_en: string | null
  description_ko: string | null
  description_en: string | null
  url: string | null
}
```

---

## 실행 순서

```
Phase 1: task-1 + task-2 (병렬)
Phase 2: task-3 ~ task-8 (병렬, Phase 1 완료 후)
Phase 3: task-9 + task-10 (병렬, Phase 2 완료 후) → task-11
Phase 4: task-12 (최종 QA)
```
