# UI - Page Header

Usage:
```html
<ui-page-header title="Filter Builder">
    <i page-icon class="pi pi-filter" aria-hidden="true"></i>
  <button page-actions pButton type="button">Save View</button>
  <button page-actions pButton type="button" outlined>Share</button>
</ui-page-header>
```

Template:
```html
<ui-page-header class="flex flex-wrap items-center justify-between gap-3 py-3">
  <h1 class="flex items-center gap-2 text-xl font-semibold">
    <!-- Icon Here -->
    <!-- Title Here  -->
  </h1>
  <div class="flex flex-wrap gap-2">
    <!-- Actions Here -->
  </div>
</ui-page-header>
```

---


Template
```html
<ui-master-detail class="grid items-start gap-4 md:grid-cols-[18rem_minmax(0,1fr)">
    <div class="min-w-0">
        <!-- Master List -->
    </div>
    <div class="min-w-0">
        <!-- Selected Detail -->
    </div>
</div>
```