# CSS 新特性 if

草案：<https://drafts.csswg.org/css-values-5/#if-notation>

<https://developer.mozilla.org/en-US/docs/Web/CSS/if>

<https://github.com/mfranzke/css-if-polyfill>

示例:

```css
.container{
  display: flex;
  width: 100px;
  height: 100px;
  background-color: if(media(max-width: 600px): red; else: blue);
  gap: if(supports(gap: 10px): 10px; else: 0);
}
```
