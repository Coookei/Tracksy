WIP Issue Tracker built with Next.js and some other thingies

### Configure
You can change the theme accent color near the end of `app/layout.tsx`:
```tsx
<Theme accentColor="cyan">
  ...
</Theme>
```
This color will then be respected throughout the app.

### .env
```env
DATABASE_URL="mysql://user:password@localhost:3306/issue-tracker"
```