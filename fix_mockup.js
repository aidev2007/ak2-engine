'use strict';
const fs = require('fs');

const PIPE_CH = String.fromCodePoint(0x2502);
const TOP_L_CH = String.fromCodePoint(0x250C);
const DASH_CH = String.fromCodePoint(0x2500);
const TOP_R_CH = String.fromCodePoint(0x2510);
const TOP_SPLIT_CH = String.fromCodePoint(0x252C);
const KANJI_PATTERN = /見た目のイメージ/;

function charWidth(cp) {
  if (cp >= 0x2500 && cp <= 0x257F) return 1;
  if ((cp>=0x1100&&cp<=0x115F)||(cp>=0x2E80&&cp<=0xA4CF)||(cp>=0xAC00&&cp<=0xD7A3)||(cp>=0xF900&&cp<=0xFAFF)||(cp>=0xFE10&&cp<=0xFE6F)||(cp>=0xFF00&&cp<=0xFFEF)||(cp>=0x1F000&&cp<=0x1FFFF)) return 2;
  return 1;
}
function strWidth(s){let w=0;for(const ch of s){w+=charWidth(ch.codePointAt(0));}return w;}
function parseTopWidth(line){
  const t=line.trimStart();
  if(!t.startsWith(TOP_L_CH))return null;
  const chars=[...t];let d=0,i=1;
  while(i<chars.length&&(chars[i]===DASH_CH||chars[i]===TOP_SPLIT_CH)){d++;i++;}
  if(i<chars.length&&chars[i]===TOP_R_CH)return d;
  return null;
}
const BOX_ONLY_RE=/^[\s\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2500\u2502]+$/;
function isContentLine(line){const t=line.trimStart();return t.startsWith(PIPE_CH)&&!BOX_ONLY_RE.test(t);}
function fixLine(line,targetWidth){
  const m=line.match(/^(\s*)/);
  const indent=m?m[1]:'';
  const chars=[...line.slice(indent.length)];
  if(chars[0]!==PIPE_CH)return line;
  let lastPipe=-1;
  for(let i=chars.length-1;i>=1;i--){if(chars[i]===PIPE_CH){lastPipe=i;break;}}
  if(lastPipe<=0)return line;
  const inner=chars.slice(1,lastPipe).join('');
  const after=chars.slice(lastPipe+1).join('');
  const mt=inner.match(/^([\s\S]*?)( *)$/);
  const content=mt?mt[1]:inner;
  const needed=targetWidth-strWidth(content);
  if(needed<0)return line;
  return indent+PIPE_CH+content+' '.repeat(needed)+PIPE_CH+after;
}
function processBlock(blockLines){
  let fixedCount=0,tw=null;
  const result=blockLines.map(line=>{
    const w=parseTopWidth(line.trimStart());
    if(w!==null){tw=w;return line;}
    const t=line.trimStart();
    if(/^[\u2514\u2518\u251C\u2524\u2534\u253C]/.test(t))return line;
    if(tw!==null&&isContentLine(line)){const pc=[...line].filter(c=>c===PIPE_CH).length;if(pc>2)return line;const f=fixLine(line,tw);if(f!==line)fixedCount++;return f;}
    return line;
  });
  return{lines:result,fixedCount};
}
function processMd(content){
  const lines=content.split('\n');
  const result=[];let fixedCount=0,inBlock=false,blockLines=[];
  const FENCE='```';
  for(const line of lines){
    if(!inBlock){
      if(line.trimStart().startsWith(FENCE)){inBlock=true;blockLines=[];result.push(line);}
      else result.push(line);
    }else{
      if(line.trimStart()===FENCE){
        const{lines:fx,fixedCount:fc}=processBlock(blockLines);
        fixedCount+=fc;for(const fl of fx)result.push(fl);
        result.push(line);inBlock=false;blockLines=[];
      }else blockLines.push(line);
    }
  }
  if(blockLines.length)for(const l of blockLines)result.push(l);
  return{content:result.join('\n'),fixedCount};
}
function processNjk(content){
  const lines=content.split('\n');
  const result=[...lines];
  let fixedCount=0,cStart=-1,imgStart=-1;
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    if(cStart===-1&&line.includes('{#'))cStart=i;
    if(cStart!==-1){
      if(imgStart===-1&&KANJI_PATTERN.test(line))imgStart=i+1;
      if(line.includes('#}')){
        if(imgStart!==-1){
          const bl=lines.slice(imgStart,i);
          const{lines:fx,fixedCount:fc}=processBlock(bl);
          fixedCount+=fc;
          for(let j=0;j<fx.length;j++)result[imgStart+j]=fx[j];
        }
        cStart=-1;imgStart=-1;
      }
    }
  }
  return{content:result.join('\n'),fixedCount};
}
const FILES=[
  'C:/dev/ak2-engine/sandbox/docs/sections/hero/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/article/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/content/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/feature-grid/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/stat-grid/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/card-feature/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/card-philosophy/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/card-stance/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/card-service/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/concept/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/cta/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/faq/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/contact/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/hero-particle/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/card-kinetic/index.md',
  'C:/dev/ak2-engine/sandbox/docs/sections/card-target/index.md',
  'C:/dev/ak2-engine/sandbox/_includes/sections/card-feature.njk',
  'C:/dev/ak2-engine/sandbox/_includes/sections/card-philosophy.njk',
  'C:/dev/ak2-engine/sandbox/_includes/sections/card-stance.njk',
  'C:/dev/ak2-engine/sandbox/_includes/sections/card-service.njk',
  'C:/dev/ak2-engine/sandbox/_includes/sections/concept.njk',
  'C:/dev/ak2-engine/sandbox/_includes/sections/cta.njk',
  'C:/dev/ak2-engine/sandbox/_includes/sections/faq.njk',
  'C:/dev/ak2-engine/sandbox/_includes/sections/contact.njk',
  'C:/dev/ak2-engine/sandbox/_includes/sections/hero-particle.njk',
  'C:/dev/ak2-engine/sandbox/_includes/sections/card-kinetic.njk',
  'C:/dev/ak2-engine/sandbox/_includes/sections/card-target.njk',
];
let totalFixed=0,filesModified=0;
for(const fp of FILES){
  try{
    const original=fs.readFileSync(fp,'utf8');
    const isNjk=fp.endsWith('.njk');
    const{content,fixedCount}=isNjk?processNjk(original):processMd(original);
    if(content!==original){
      fs.writeFileSync(fp,content,'utf8');
      console.log('FIXED '+fixedCount+' lines: '+fp);
      totalFixed+=fixedCount;filesModified++;
    }else{
      console.log('no change: '+fp);
    }
  }catch(e){console.log('ERROR: '+fp+' - '+e.message);}
}
console.log('');
console.log('--- 完了 ---');
console.log('修正ファイル数: '+filesModified);
console.log('修正行数合計: '+totalFixed);
