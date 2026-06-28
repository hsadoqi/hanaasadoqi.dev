# Case Studies

## Components

### Grid

#### "Auto" Layout

_Option A: Grid controls_

```js
// Grid knows: "first item spans full width, rest in 2-col grid"
<CaseStudyGrid variant="auto" studies={studies} />
// Grid handles all layout logic
```

_Option B: Children declare their size_

```js
// Each card says what it wants
const studies = [
  { layout: 'featured', span: 'full' }, // full width
  { layout: 'compact', span: 'half' }, // 2 per row
  { layout: 'compact', span: 'half' },
];

// Grid just respects it
<CaseStudyGrid studies={studies} />;
```

#### Variants

_Auto_ - Grid automatically determines layout based on the number of items and their type (featured vs compact).

-
