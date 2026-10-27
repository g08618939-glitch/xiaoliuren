/* 九神小六壬：可配置、可追溯的逻辑引擎。传统规则状态见 RULE_CONFIG。 */
export const RULE_CONFIG={version:'JSLR-MVP-0.1',source:'项目配置/待传统资料核验',status:'部分待验证',notes:'九神循环与示意九宫是项目配置；不能视为已确认的传统标准。'};
export const NAMES=['大安','留连','速喜','赤口','小吉','空亡','病符','桃花','天德'];
export const FIVE={木:'木',火:'火',土:'土',金:'金',水:'水',未知:'未配置'};
export const GODS=NAMES.map((name,i)=>({name,index:i+1,element:'未知',source:'未核验',status:'待验证',meaning:['安稳守成','迟缓牵连','快速消息','口舌误会','小成助力','落空虚耗','病弱阻滞','情感吸引','护佑恩德'][i]}));
export const GRID=[['巽','离','坤'],['震','中','兑'],['艮','坎','乾']];
export const GRID_DEMO=[['留连','速喜','病符'],['大安','空亡','赤口'],['桃花','小吉','天德']];
export const MATTER={工作事业:'分析推进、合作、阻碍与变化',求财经营:'分析交易条件、周转、成本与风险',感情婚姻:'分析沟通、互动与现实问题',人际关系:'分析表达、边界与互助',出行办事:'分析准备、时间与潜在阻碍',学业考试:'分析准备、专注与发挥',失物寻物:'分析线索、范围与复查',健康事项:'仅作传统文化象意说明，不作诊断或治疗建议'};
export function index(n){if(!Number.isInteger(n))throw Error('编号必须是整数');return ((n-1)%9+9)%9+1}
export function nameAt(n){return NAMES[index(n)-1]}
export function cycle(start,count){return Array.from({length:count},(_,i)=>nameAt(start+i))}
export function validateTriple(a,b,c){return [a,b,c].every(x=>Number.isInteger(x)&&x>=0)}
export function threeNumbers(a,b,c){if(!validateTriple(a,b,c))throw Error('三数必须是非负整数');const first=index(a||9);return {mode:'三数起课',numbers:[a,b,c],initial:first,transmissions:[first,index(first+b),index(first+b+c)],rule:'自定义：第一数定位初传，第二数顺推中传，第三数顺推末传；待传统规则核验。'}}
export function lunarTime(month,day,hour){if(![month,day,hour].every(Number.isInteger)||month<1||month>12||day<1||day>30||hour<0||hour>11)throw Error('农历月、日或时辰不合法');const first=index(month);return {mode:'农历时间起课',input:{month,day,hour},initial:first,transmissions:[first,index(first+day-1),index(first+day-1+hour)],rule:'自定义可配置：月定位初传，日与时顺推；农历转换由浏览器日历提供，闰月/子时需进一步核验。'}}
export function relation(a,b){if(a==='未知'||b==='未知')return {type:'未配置',basis:'九神五行属性尚未核验'};if(a===b)return {type:'比和',basis:`${a}与${b}相同`};const sh={木:'火',火:'土',土:'金',金:'水',水:'木'},ke={木:'土',土:'水',水:'火',火:'金',金:'木'};if(sh[a]===b)return {type:'相生',basis:`${a}生${b}`};if(sh[b]===a)return {type:'被生',basis:`${b}生${a}`};if(ke[a]===b)return {type:'相克',basis:`${a}克${b}`};if(ke[b]===a)return {type:'被克',basis:`${b}克${a}`};return {type:'无直接关系',basis:'按当前五行配置'};}
export function board(trans){return GRID.map((row,r)=>row.map((palace,c)=>({palace,god:GRID_DEMO[r][c],mark:trans.map((x,i)=>x===index(r*3+c+1)?['初传','中传','末传'][i]:'').filter(Boolean)})))}
export function analyze(trans,matter='工作事业'){const gods=trans.map(nameAt);const elements=trans.map(n=>GODS[n-1].element);return {gods,elements,relations:[relation(elements[0],elements[1]),relation(elements[1],elements[2])],matter,summary:`${matter}：以${gods[0]}为起点，经过${gods[1]}，结果落在${gods[2]}。${MATTER[matter]}。当前属于${RULE_CONFIG.status}配置，仅作传统文化学习参考。`}}
