<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep page art, scanlines and print grain in separate non-interactive layers; this preserves readable text and accessible controls.
- Keep visual roles and effects in global semantic CSS tokens; this lets palette changes apply consistently across the site.
- Keep background audio in a dedicated player that attempts playback on entry and falls back to a visitor gesture when blocked; manual pause must remain respected.
- Keep wheel scrolling on Lenis interpolation and reveal timing in semantic CSS variables, without per-frame layout reads or full-width image transforms; native touch scrolling, reduced-motion support and one-time transform/opacity reveals avoid unnecessary rendering work.
