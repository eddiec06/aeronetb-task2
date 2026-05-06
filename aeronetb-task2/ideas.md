# AeroNetB Dashboard — Design Ideas

<response>
<idea>
**Design Movement**: Clean Academic / University Coursework Minimal
**Core Principles**:
- Clarity over decoration — every element serves a purpose
- Soft whites and slate blues to convey professionalism without corporate coldness
- Generous whitespace to let content breathe
- Card-based layout with subtle shadows for depth

**Color Philosophy**: Light slate-blue primary (#3B82F6 / blue-500) on a near-white background (#F8FAFC). Accent with soft green for "Passed" statuses and amber for warnings. The palette feels academic and trustworthy — like a well-formatted university report.

**Layout Paradigm**: Left sidebar navigation (fixed, narrow) + main content area. Login page is centered card. Dashboard uses a 2-column KPI grid on top, then full-width sections below.

**Signature Elements**:
- Rounded cards with a 1px border and subtle box-shadow
- Small coloured status badges (pill-shaped)
- Simple icon + label nav items in the sidebar

**Interaction Philosophy**: Hover states on nav items (light blue tint), table rows highlight on hover. Clean transitions (150ms ease).

**Animation**: Minimal — fade-in on page mount, no excessive motion.

**Typography System**: `Inter` for body text (clean, readable), `Space Grotesk` for headings (slightly technical feel). Font weights: 400 body, 600 labels, 700 headings.
</idea>
<probability>0.08</probability>
</response>

<response>
<idea>
**Design Movement**: Technical Blueprint / Engineering Document
**Core Principles**:
- Monospace accents to suggest code/data origins
- Dark navy sidebar with white text, light main area
- Grid lines as visual separators rather than heavy borders
- Data-first hierarchy

**Color Philosophy**: Navy (#1E3A5F) sidebar, white main, blue-600 accents. Tables use alternating row shading. Status chips use green/red/amber.

**Layout Paradigm**: Fixed dark sidebar (220px) + scrollable main content. Top bar shows breadcrumb + user role badge.

**Signature Elements**:
- Monospace font for IDs and codes
- Thin horizontal rules between sections
- Compact tables with tight row heights

**Interaction Philosophy**: Functional — no decorative animations. Focus on data legibility.

**Animation**: None beyond basic hover transitions.

**Typography System**: `JetBrains Mono` for data/IDs, `DM Sans` for UI labels and headings.
</idea>
<probability>0.07</probability>
</response>

<response>
<idea>
**Design Movement**: Friendly Student Dashboard (chosen)
**Core Principles**:
- Approachable and readable — looks like a well-done student project
- White cards on a light grey background (#F1F5F9)
- Blue primary colour for nav and buttons
- Clear section headings with icons

**Color Philosophy**: Background: #F1F5F9 (slate-100). Cards: white. Primary: #2563EB (blue-600). Text: #1E293B (slate-800). Muted: #64748B (slate-500). Status green: #16A34A, amber: #D97706, red: #DC2626.

**Layout Paradigm**: Top header bar + left sidebar (collapsible on mobile) + main content. Login is a centered card on the same slate background.

**Signature Elements**:
- Rounded-xl white cards with shadow-sm
- Coloured left-border accent on KPI cards
- Simple lucide-react icons throughout

**Interaction Philosophy**: Hover effects on sidebar items and table rows. Active page highlighted in sidebar.

**Animation**: Subtle fade on page transitions, no over-engineering.

**Typography System**: `Inter` for all text. Headings bold (700), labels semibold (600), body regular (400).
</idea>
<probability>0.09</probability>
</response>
