import { firebaseConfig, firebaseReady } from "./firebase-config.js";

const $ = (id) => document.getElementById(id);

const typeMeta = {
  "价格敏感型": {
    mistaken: "关系信任型",
    basis: "频繁比较价格、关注优惠和会员价，决策按钮是“划算”。",
    traits: "看价签、问活动、犹豫下单、对组合优惠敏感。",
    inspiration: "先降低价格焦虑，再解释产品差异，避免一上来推高价。",
    master: ["阿姨，您更想先买一瓶试试，还是长期吃更划算一点？", "您平时是固定补充，还是看到活动时囤一点？", "先给两档选择，再说明差异和活动。", "重点介绍会员价、积分抵扣和活动提醒。", "这款先按今天最划算的组合给您配。", "不要用“贵的更好”压顾客。"]
  },
  "品质追求型": {
    mistaken: "专家附体型",
    basis: "愿意问细节，但目标是确认可靠、稳定和体验感。",
    traits: "看品牌、看成分、问口碑、不追最低价。",
    inspiration: "用稳定感和信任感打动顾客，而不是只讲便宜。",
    master: ["您更看重品牌口碑，还是成分和使用体验？", "之前用过哪类产品，哪里不太满意？", "用品牌、成分、适用场景和复购反馈建立品质感。", "推荐会员专属品质好物和复购提醒。", "这款更符合您对品质稳定的要求，可以先按一个周期体验。", "不要把品质型顾客当成只看价格。"]
  },
  "关系信任型": {
    mistaken: "沉默观察型",
    basis: "顾客关注店员和门店关系，重视被记住和持续服务。",
    traits: "找熟人、聊近况、听建议、认可门店服务。",
    inspiration: "先建立熟悉感，再进入产品推荐。",
    master: ["您上次买的用着还顺不顺？今天我先帮您看看。", "家里谁在用？最近情况有没有变化？", "记住历史需求，用回访感拉近距离。", "强调会员档案和下次提醒。", "这次我先给您配稳妥的，下次您过来我再帮您跟进。", "不要一见面就急着成交。"]
  },
  "赠品猎人型": {
    mistaken: "价格敏感型",
    basis: "不只是低价，赠品、满减和占便宜感会明显影响购买。",
    traits: "先问赠品、爱凑单、比较活动、喜欢实用礼品。",
    inspiration: "先确认刚需，再用活动组合制造获得感。",
    master: ["今天您是买刚需，还是也看看有什么划算组合？", "赠品您更喜欢日用品，还是实用小工具？", "先确认需求，再给买赠组合。", "介绍会员日、积分兑换和专属赠礼。", "这个组合刚好参加活动，赠品也最实用。", "不要一句“没有赠品”结束沟通。"]
  },
  "急性需求型": {
    mistaken: "时间紧迫型",
    basis: "核心诉求是立刻解决眼前问题，希望获得明确答案。",
    traits: "语气着急、目标明确、拒绝加购、需要快速缓解。",
    inspiration: "少讲背景，多做确认，给出清晰选择。",
    master: ["您现在最急的是哪一种不舒服？我先帮您缩小范围。", "这种情况是刚开始，还是已经持续一段时间？", "快速确认场景，给出明确选择。", "简短提示会员记录，方便后续复购。", "这款先解决您当前需求，我再提醒您注意事项。", "不要长篇介绍拖慢节奏。"]
  },
  "沉默观察型": {
    mistaken: "怀疑一切型",
    basis: "顾客不是不信任，而是在自己收集信息，需要空间感。",
    traits: "慢慢看、少提问、手机查、被跟随会后退。",
    inspiration: "保持低压服务，让顾客感觉安全。",
    master: ["您先慢慢看，需要比较的话我可以帮您把差异说清楚。", "您是给自己看，还是帮家人带？", "保持距离，提供轻量帮助。", "自然提示会员价，不强行推销。", "这两个最符合您的方向，我把差别简单标给您。", "不要贴身跟随连续追问。"]
  },
  "专家附体型": {
    mistaken: "品质追求型",
    basis: "顾客用已有信息验证员工专业度，关注推荐逻辑。",
    traits: "带攻略、问参数、追问依据、挑战模糊表达。",
    inspiration: "先认可功课，再补充线下场景判断。",
    master: ["您做过功课很细，我帮您把门店现货和适用场景对一下。", "您最在意的是成分、品牌，还是后续使用反馈？", "先认可，再用逻辑说明推荐理由。", "强调会员售后咨询和复购记录。", "按您关注的点，这款更匹配；我把注意事项也写给您。", "不要直接否定顾客网上看到的信息。"]
  },
  "时间紧迫型": {
    mistaken: "急性需求型",
    basis: "问题不一定急，但顾客没有时间听复杂介绍。",
    traits: "看表、催促、要求结论、希望快速结账。",
    inspiration: "把选择压缩到两档，用最短路径完成服务。",
    master: ["我用20秒帮您选，您只要告诉我是自己用还是家人用。", "您更想省心，还是更想划算？", "提供两档选择和明确结论。", "提示会员快捷结账和电子小票。", "这款最省时间，我直接帮您拿到收银台。", "不要拖延式讲解。"]
  },
  "投诉风险型": {
    mistaken: "怀疑一切型",
    basis: "顾客带着负面体验，需要先被倾听和安抚。",
    traits: "情绪明显、声音偏大、关注处理结果、反感推诿。",
    inspiration: "先处理情绪，再处理问题，避免争辩升级。",
    master: ["您先别着急，我先把情况听完整，再帮您处理。", "您最希望我们今天先解决哪一件事？", "先共情记录，再给明确处理步骤。", "用会员记录帮助追溯购买和服务历史。", "我先给您一个明确处理步骤，后续我负责跟进。", "不要急于解释责任。"]
  },
  "慢病咨询型": {
    mistaken: "关系信任型",
    basis: "需求长期稳定，更关注持续服务、提醒和复购便利。",
    traits: "周期复购、希望提醒、重视档案、追求省心。",
    inspiration: "把一次销售变成长期陪伴。",
    master: ["您这类需求是长期管理，我先了解一下平时使用习惯。", "平时是谁帮您买？大概多久补一次？", "建立档案，按周期提醒。", "重点推荐会员档案、提醒和复购优惠。", "我帮您按周期配好，下次快用完前提醒您。", "不要只做一次性销售。"]
  },
  "家庭决策型": {
    mistaken: "沉默观察型",
    basis: "真正决策者可能不在现场，顾客需要可转述的信息。",
    traits: "拍照发家人、反复商量、怕买错、不喜欢被催。",
    inspiration: "给顾客回家能讲清楚的理由。",
    master: ["这是给家里哪位准备的？我帮您整理几个好比较的点。", "家里人更在意价格、品牌，还是使用方便？", "提供两档方案和可转述卖点。", "推荐会员收藏和活动锁价。", "我给您留两个选择，您回去一说就清楚。", "不要强迫当场决定。"]
  },
  "养生达人型": {
    mistaken: "专家附体型",
    basis: "重视健康生活方式和仪式感，不一定是在挑战专业。",
    traits: "聊习惯、重长期、喜欢搭配、反感夸张承诺。",
    inspiration: "把产品连接到日常生活场景。",
    master: ["您平时很注重养生吧？我帮您按日常习惯搭配看看。", "您现在坚持得最好的是饮食、运动，还是营养补充？", "围绕生活场景和坚持成本推荐。", "推荐会员健康日和组合购活动。", "这套更适合长期坚持，不会一下子负担太重。", "不要只讲产品参数。"]
  },
  "社交分享型": {
    mistaken: "品质追求型",
    basis: "顾客重视口碑、分享感和简单好讲的购买理由。",
    traits: "看推荐、问热度、爱拍照、喜欢社群福利。",
    inspiration: "给出容易传播的体验卖点。",
    master: ["您是自己用，还是看朋友推荐想来试试？", "您更相信朋友口碑，还是门店复购反馈？", "提供简单好记的卖点和真实反馈。", "推荐会员分享福利和社群活动。", "这款反馈比较好，您用完也方便推荐给家人朋友。", "不要只讲硬参数，忽略体验感。"]
  },
  "怀疑一切型": {
    mistaken: "投诉风险型",
    basis: "顾客对销售动机和产品承诺戒备，但不一定已有投诉。",
    traits: "先问风险、质疑推荐、追问售后、偏好小规格。",
    inspiration: "越透明越容易建立信任。",
    master: ["您谨慎一点是对的，我只讲清楚适合和不适合的情况。", "您最担心的是没效果、价格，还是买错？", "透明说明边界、价格和售后。", "强调会员记录和售后咨询。", "您可以先选稳妥的小规格，合适再复购。", "不要夸大效果或逼单。"]
  },
  "小红书专家型顾客": {
    mistaken: "专家附体型",
    basis: "被社交平台种草，也担心踩雷，既兴奋又怀疑。",
    traits: "带测评、说平台术语、问爆款、验证线下专业度。",
    inspiration: "认可对方做功课，再把爆款拉回真实场景匹配。",
    master: ["您看到的那款确实很多人讨论，我帮您看它适不适合您的场景。", "您被种草的是成分、反馈，还是性价比？", "认可功课，用场景匹配和线下服务建立专业感。", "推荐会员专属试用、复购提醒和新品体验。", "不一定选最火的，选最匹配的更稳。", "不要嘲笑平台信息，也不要盲目跟风推荐。"]
  }
};

const rawCustomers = [
"👵|王阿姨|58|购买钙片|我先看看，不一定买。|经常比较价格/停留时间较长/对赠品敏感/不主动透露需求|谨慎观望|价格敏感型|普通顾客",
"👨|李师傅|46|买护膝和膏贴|你们这有没有便宜点但好用的？|先看价签再看包装/问不同规格差价/对满减活动敏感/反复确认能用多久|精打细算|价格敏感型|普通顾客",
"👩|赵女士|35|选维生素|我不要太杂的，品质稳定最重要。|关注品牌来源/会看成分表/不太在意最低价/询问复购反馈|认真挑选|品质追求型|普通顾客",
"🧑|周经理|42|买家用常备药箱|给家里备着，麻烦推荐靠谱一点的。|要求包装清楚/强调安全稳妥/愿意听完整介绍/偏好知名品牌|稳重理性|品质追求型|普通顾客",
"👴|陈叔|66|复购常用保健品|上次那个小姑娘给我拿的挺好，你认识她不？|先找熟悉店员/愿意讲近况/听建议后决策快/重视被记住|亲切信赖|关系信任型|普通顾客",
"👩‍🦱|刘姐|49|买家人常用药|你帮我看看，上次你们推荐的还可以。|主动回忆上次服务/愿意接受搭配建议/喜欢固定门店/在意服务态度|放松熟络|关系信任型|普通顾客",
"🧓|孙奶奶|72|买鱼油|今天买两瓶送什么呀？|先问赠品/对买赠组合兴奋/愿意凑单/喜欢拿实用小礼品|期待薅羊毛|赠品猎人型|普通顾客",
"👩|冯小姐|29|买口罩和润喉糖|满多少有赠品？我可以再看看。|主动凑满减/比较赠品款式/对会员日感兴趣/容易被组合活动打动|兴致勃勃|赠品猎人型|普通顾客",
"🏃|外卖小哥小秦|27|快速买创可贴|快点快点，我赶时间，哪种直接能用？|进门直奔柜台/语速快/不想听长介绍/希望马上结账|焦急|时间紧迫型|普通顾客",
"👨‍💼|高先生|38|买肠胃不适用品|我马上开会，给我最快的选择。|看手表/只接受两三个选项/拒绝复杂讲解/追求省时间|急促|时间紧迫型|困难顾客",
"😣|马女士|31|临时买止痒用品|现在就很难受，先给我能缓解的。|描述当前困扰/不愿慢慢挑/需要明确答案/追问是否方便使用|不适着急|急性需求型|普通顾客",
"🤧|小吴|24|感冒场景用品|我今天还有事，先解决眼前这个。|目标非常明确/接受快速确认/不关心赠品/想尽快缓解不适|烦躁|急性需求型|普通顾客",
"🧍|何同学|21|看营养补充剂|不用管我，我自己看看。|绕货架慢慢看/很少主动提问/拿起又放下/被贴身跟随会后退|安静防备|沉默观察型|普通顾客",
"👩‍💻|唐女士|33|选眼部护理产品|我先对比一下，你忙你的。|手机查信息/低头看标签/不喜欢被打断/需要空间感|专注|沉默观察型|普通顾客",
"🤓|郑老师|52|购买益生菌|这个菌株含量是多少？和网上说的一样吗？|连续问细节/会引用网上资料/验证店员专业度/不接受含糊回答|考官上线|专家附体型|困难顾客",
"🧑‍🔬|梁先生|40|买蛋白粉|你先说说这款和另一款核心区别。|要求逻辑清晰/关注参数差异/追问适用人群/喜欢被专业对待|理性审视|专家附体型|困难顾客",
"😤|胡女士|44|处理上次购物不满|上次你们说得挺好，结果我回去根本不满意。|带着情绪进店/声音偏大/要求解释/容易影响旁边顾客|不满|投诉风险型|地狱顾客",
"🧔|曹先生|39|退换咨询|我就问这事今天能不能解决。|关注处理结果/不想听推诿/反复强调时间/对规则敏感|压着火|投诉风险型|地狱顾客",
"👴|许爷爷|69|长期补充用品|我这个是长期用的，你帮我看看怎么更方便。|关注复购周期/愿意建立档案/重视持续提醒/经常为固定需求到店|稳定务实|慢病咨询型|普通顾客",
"👵|林阿姨|63|家用长期管理用品|家里一直用，怕忘了买，你们能提醒吗？|购买频率稳定/关注长期服务/对会员提醒感兴趣/希望省心|依赖服务|慢病咨询型|普通顾客",
"👨‍👩‍👧|邓爸爸|37|给父母买营养品|我得问问我妈，她不一定同意。|决策者不在现场/反复拍照发微信/需要转述理由/不喜欢被催单|犹豫|家庭决策型|普通顾客",
"👩‍👦|魏女士|41|给孩子买护理用品|我先拍给家里人看看，等下再说。|频繁沟通家人/关注多人意见/需要简单对比/容易延迟成交|谨慎商量|家庭决策型|普通顾客",
"🧘|沈阿姨|55|选养生茶饮|我平时很注意调理，想找温和一点的。|喜欢长期坚持/关注生活方式/爱聊养生习惯/不急于成交|悠然|养生达人型|普通顾客",
"🌿|罗女士|47|买维矿类产品|我每天都打卡养生，想搭配得科学一点。|有固定健康习惯/喜欢组合搭配/关注仪式感/愿意听生活建议|积极自律|养生达人型|普通顾客",
"📱|小袁|26|朋友推荐产品|我朋友说这个挺好，你们店里买的人多吗？|相信口碑/想听真实反馈/容易被分享话术影响/会拍照发朋友圈|好奇|社交分享型|普通顾客",
"👯|米娜|30|买网红护理产品|这个最近是不是挺火？我看好多姐妹在推荐。|关注流行度/在意包装和体验/喜欢可分享卖点/对社群福利感兴趣|被种草|社交分享型|普通顾客",
"🧐|严先生|50|买家用常备药|你们推荐这个，是不是因为利润高？|质疑销售动机/要求透明解释/不接受夸大承诺/喜欢小规格试用|怀疑|怀疑一切型|困难顾客",
"🤨|季女士|36|比较儿童用品|你别光说好，先说有什么不适合的。|先问风险/追问售后/对推销敏感/需要边界说明|戒备|怀疑一切型|困难顾客",
"📕|小红书Luna|28|购买爆款营养品|小红书都说这个绝绝子，你们怎么证明不是智商税？|用社交平台术语/挑战专业度/想要线下验证/既想种草又怕踩雷|半信半疑|小红书专家型顾客|隐藏BOSS顾客",
"🧢|博主阿Ken|32|探店式咨询|我做过攻略了，你别给我讲官方话术。|信息量很大/会现场对比线上价格/追问真实反馈/可能公开评价服务|审稿人模式|小红书专家型顾客|隐藏BOSS顾客",
"👩|白女士|45|买蛋白粉|贵点可以，但别让我买回去闲置。|关注实际使用/在意品质和坚持度/愿意投资健康/需要明确场景|务实挑剔|品质追求型|普通顾客",
"👴|钱叔|61|买跌打用品|隔壁好像便宜两块，你们有什么活动？|熟悉周边价格/会提竞品门店/愿意为优惠留下/对会员价敏感|老练|价格敏感型|困难顾客",
"👩‍🦳|梅阿姨|64|买常用护理品|我就信你们这个店，别给我拿不合适的。|信任门店/强调别坑她/愿意听熟人建议/重视长期关系|信任中带提醒|关系信任型|普通顾客",
"🎁|潘小姐|34|买维C|如果买两盒没有赠品，那我就先不买了。|赠品影响购买决定/喜欢活动解释/会为了赠品升级规格/对礼品实用性敏感|期待福利|赠品猎人型|困难顾客",
"🏃‍♀️|快节奏Lucy|31|买旅行常备品|我车停门口，三分钟内搞定。|明确时间限制/要清单式推荐/不想扫码慢慢看/愿意为效率买单|风风火火|时间紧迫型|困难顾客",
"😖|小唐|23|买口腔护理用品|现在特别不舒服，别给我推荐一堆。|只想解决当前问题/抗拒加购/需要安抚/接受简单提醒|难受|急性需求型|普通顾客",
"🧍‍♀️|孟小姐|27|选女性护理产品|我看看就行，有需要叫你。|需要隐私感/避开人多货架/不主动透露需求/适合轻声服务|克制|沉默观察型|困难顾客",
"🧠|杜博士|48|买营养补充剂|你这个推荐逻辑是什么？别只说卖得好。|要求推荐依据/重视逻辑链路/会挑战模糊表达/认可专业后成交快|严谨|专家附体型|地狱顾客",
"😠|葛阿姨|57|抱怨会员权益|我办会员有什么用？上次优惠都没提醒我。|对会员服务失望/情绪外露/需要补救方案/关注被重视感|委屈生气|投诉风险型|地狱顾客",
"👴|蒋伯|70|购买固定用品|我每个月都来，你们能不能别每次都重新问？|需要历史记录/重视连续服务/对重复沟通不耐烦/适合会员档案|嫌麻烦|慢病咨询型|困难顾客",
"👨‍👧|宋先生|43|给妻子买营养品|我不懂，她让我买，我怕买错。|代购属性明显/需要低风险选择/会发照片确认/希望员工帮忙背书|没把握|家庭决策型|普通顾客",
"🍵|乔老师|59|买养生茶|我不追求快，主要想长期调理舒服。|喜欢慢节奏沟通/关注日常搭配/不喜欢强刺激表达/重视坚持体验|平和|养生达人型|普通顾客",
"📣|娜娜|25|选美妆健康类产品|这个我能推荐给闺蜜吗？有没有好讲的卖点？|关注分享理由/喜欢简单话术/在意外观体验/对社群活动活跃|兴奋|社交分享型|普通顾客",
"🛡️|莫先生|45|买保健品|你先告诉我，什么情况下不建议买？|先排雷/要求客观/反感绝对化承诺/信任建立后很稳定|谨慎防坑|怀疑一切型|困难顾客",
"📱|种草达人桃桃|24|买平台爆款|我收藏了五篇测评，你帮我看看哪篇靠谱。|带着攻略进店/信平台又怕翻车/喜欢对比清单/考验员工沟通弹性|兴奋质疑|小红书专家型顾客|隐藏BOSS顾客",
"👩‍💼|秦总|39|买高端营养品|别给我推便宜的，我要送人拿得出手。|重视体面和品质/愿意高客单/关注包装和品牌/需要送礼场景建议|干脆|品质追求型|困难顾客",
"👨|老韩|54|买常备药|你给我算算，怎么买最划算？|主动要求算账/会比较组合/关注总价/不抗拒合理加购|会过日子|价格敏感型|普通顾客",
"🧑‍🦱|阿峰|29|朋友代买|我兄弟让我来买这个，你们熟的话帮我确认下。|代买但信任门店/需要确认感/愿意听熟人建议/关注别买错|随和|关系信任型|普通顾客",
"🎀|惠惠|36|买家庭常用品|今天会员日有没有小礼品？我带孩子来的。|对活动敏感/孩子会影响购买节奏/喜欢实用赠品/容易参与会员活动|开心期待|赠品猎人型|普通顾客",
"⏰|田小姐|33|午休买护理用品|我午休快结束了，你直接给我结论。|时间窗口短/要求结论明确/不愿听品牌故事/接受高效率服务|紧张|时间紧迫型|普通顾客",
"😟|焦女士|52|家人临时不适|家里人现在等着用，我该买哪个？|为家人着急/需要快速确认/容易焦虑/希望员工给明确方向|担心|急性需求型|困难顾客",
"👀|小林|22|看祛痘护理|我就看看，不想被推销。|对推销抗拒/需要隐私和尊重/会悄悄比较/适合轻触达|敏感|沉默观察型|普通顾客",
"📚|施女士|41|买儿童营养品|我查到有三种说法，你们门店怎么看？|带问题清单/不接受一句话答案/需要把复杂信息讲简单/重视安全感|求证|专家附体型|困难顾客",
"⚠️|康先生|47|反馈服务问题|上次那个店员态度不好，今天你们最好给我说明白。|迁怒门店/先表达不满/容易升级投诉/需要主动承接|警惕生气|投诉风险型|地狱顾客",
"📅|邹阿姨|62|买长期复购用品|我老忘，能不能到时间提醒我来买？|复购规律/依赖提醒/愿意加入会员/关注省心服务|期待省心|慢病咨询型|普通顾客",
"💬|小徐|34|帮父母买补剂|我爸妈意见不一样，我夹在中间。|多方决策/需要折中方案/喜欢带资料回家/不适合强成交|为难|家庭决策型|困难顾客",
"🌞|晴姨|56|买日常营养品|我每天散步、泡脚，还想补充点基础的。|生活规律/喜欢健康仪式感/容易接受长期计划/不喜欢夸张承诺|乐观|养生达人型|普通顾客"
];




function createPlayerId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
  return `player_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

let databaseApi = null;
let db = null;
let unsubscribePlayers = null;
let onlinePlayers = [];
let activeBoard = "score";

const customers = rawCustomers.map((row) => {
  const [avatar, name, age, purpose, line, traitText, mood, type, difficulty] = row.split("|");
  return { avatar, name, age, purpose, line, traits: traitText.split("/"), mood, type, difficulty };
});

const state = {
  playerId: localStorage.getItem("pg_player_id") || createPlayerId(),
  playerName: localStorage.getItem("pg_player_name") || "",
  storeName: localStorage.getItem("pg_store_name") || "",
  current: null,
  answered: false,
  lastCustomerName: "",
  online: false
};
localStorage.setItem("pg_player_id", state.playerId);

function defaultStats() {
  return {
    playerId: state.playerId,
    name: state.playerName,
    store: state.storeName,
    score: 0,
    attempts: 0,
    correct: 0,
    correctRate: 0,
    streak: 0,
    bestStreak: 0,
    title: "新手观察员",
    history: [],
    updatedAtMs: Date.now()
  };
}

function getStats() {
  try {
    const saved = JSON.parse(localStorage.getItem("pg_stats") || "{}");
    return normalizeStats({ ...defaultStats(), ...saved, name: state.playerName, store: state.storeName, playerId: state.playerId });
  } catch {
    return defaultStats();
  }
}

function normalizeStats(stats) {
  stats.attempts = Number(stats.attempts || 0);
  stats.correct = Number(stats.correct || 0);
  stats.score = Number(stats.score || 0);
  stats.streak = Number(stats.streak || 0);
  stats.bestStreak = Number(stats.bestStreak || 0);
  stats.correctRate = stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : 0;
  stats.title = titleFor(stats);
  stats.updatedAtMs = Date.now();
  return stats;
}

function titleFor(stats) {
  if (stats.score >= 500 && stats.correctRate >= 85) return "顾客读心王";
  if (stats.bestStreak >= 10) return "连胜战神";
  if (stats.correctRate >= 90 && stats.attempts >= 10) return "精准洞察师";
  if (stats.score >= 220) return "金牌服务官";
  if (stats.score >= 120) return "门店洞察达人";
  if (stats.attempts >= 5) return "顾客观察员";
  return "新手观察员";
}

async function initFirebase() {
  const status = $("firebaseStatus");
  const onlineStatus = $("onlineStatus");
  if (!firebaseReady) {
    status.textContent = "未配置 Firebase Realtime Database：当前为本机体验，配置后即可多人在线排行。";
    onlineStatus.textContent = "未配置在线榜";
    status.classList.add("warn");
    renderLeaderboard();
    return;
  }
  try {
    const [{ initializeApp }, database] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js")
    ]);
    databaseApi = database;
    const app = initializeApp(firebaseConfig);
    db = database.getDatabase(app, firebaseConfig.databaseURL);
    state.online = true;
    status.textContent = "在线排行榜已连接，所有玩家成绩将实时同步。";
    status.classList.add("ok");
    onlineStatus.textContent = "实时刷新";
    await pushStats(getStats());
    subscribePlayers();
  } catch (error) {
    console.error(error);
    status.textContent = "Firebase 连接失败：请检查 databaseURL、Realtime Database 是否创建、规则是否发布。";
    status.classList.add("warn");
    onlineStatus.textContent = "连接失败";
    state.online = false;
    renderLeaderboard();
  }
}

async function pushStats(stats) {
  saveLocal(stats);
  if (!state.online || !db || !databaseApi || !state.playerName) return;
  const { ref, set } = databaseApi;
  const payload = {
    playerId: stats.playerId,
    name: stats.name,
    store: stats.store,
    score: stats.score,
    attempts: stats.attempts,
    correct: stats.correct,
    correctRate: stats.correctRate,
    streak: stats.streak,
    bestStreak: stats.bestStreak,
    title: stats.title,
    updatedAtMs: Date.now()
  };
  await set(ref(db, `players/${state.playerId}`), payload);
}

async function syncStatsSafely(stats) {
  try {
    await pushStats(stats);
  } catch (error) {
    console.error(error);
    saveLocal(stats);
    state.online = false;
    $("onlineStatus").textContent = "本机记录";
    showToast("在线排行榜暂时未连接，本次成绩已保存在本机。", true);
  }
}

function saveLocal(stats) {
  localStorage.setItem("pg_stats", JSON.stringify(stats));
  localStorage.setItem("pg_player_name", state.playerName);
  localStorage.setItem("pg_store_name", state.storeName);
  renderPlayer(stats);
}

function subscribePlayers() {
  if (!state.online || !db || !databaseApi) return;
  if (unsubscribePlayers) unsubscribePlayers();
  const { ref, onValue, off } = databaseApi;
  const playersRef = ref(db, "players");
  const listener = onValue(playersRef, (snapshot) => {
    const value = snapshot.val() || {};
    onlinePlayers = Object.entries(value).map(([id, data]) => normalizeRemote({ id, ...data }));
    renderLeaderboard(true);
  }, (error) => {
    console.error(error);
    $("onlineStatus").textContent = "刷新失败";
    showToast("在线排行榜刷新失败，请检查 Realtime Database 规则。", true);
  });
  unsubscribePlayers = () => off(playersRef, "value", listener);
}

function normalizeRemote(item) {
  return {
    id: item.id || item.playerId,
    playerId: item.playerId || item.id,
    name: item.name || "未命名玩家",
    store: item.store || "未填写门店",
    score: Number(item.score || 0),
    attempts: Number(item.attempts || 0),
    correct: Number(item.correct || 0),
    correctRate: Number(item.correctRate || 0),
    streak: Number(item.streak || 0),
    bestStreak: Number(item.bestStreak || 0),
    title: item.title || "新手观察员",
    updatedAtMs: Number(item.updatedAtMs || 0)
  };
}

function fallbackPlayers() {
  const stats = getStats();
  if (!stats.name) return [];
  return [normalizeRemote(stats)];
}

function leaderboardRows() {
  const rows = state.online ? onlinePlayers : fallbackPlayers();
  if (activeBoard === "streak") {
    return [...rows].sort((a, b) => b.bestStreak - a.bestStreak || b.streak - a.streak || b.score - a.score);
  }
  if (activeBoard === "accuracy") {
    return [...rows].filter((x) => x.attempts > 0).sort((a, b) => b.correctRate - a.correctRate || b.correct - a.correct || b.score - a.score);
  }
  if (activeBoard === "store") {
    const map = new Map();
    rows.forEach((player) => {
      const key = player.store || "未填写门店";
      const item = map.get(key) || { store: key, score: 0, attempts: 0, correct: 0, players: 0, bestStreak: 0 };
      item.score += player.score;
      item.attempts += player.attempts;
      item.correct += player.correct;
      item.players += 1;
      item.bestStreak = Math.max(item.bestStreak, player.bestStreak || 0);
      map.set(key, item);
    });
    return [...map.values()].map((item) => ({
      ...item,
      name: item.store,
      correctRate: item.attempts ? Math.round((item.correct / item.attempts) * 100) : 0,
      title: `${item.players}人参赛`
    })).sort((a, b) => b.score - a.score || b.correctRate - a.correctRate);
  }
  return [...rows].sort((a, b) => b.score - a.score || b.correctRate - a.correctRate || b.bestStreak - a.bestStreak);
}

function renderLeaderboard(animated = false) {
  const box = $("leaderboard");
  const rows = leaderboardRows();
  if (!rows.length) {
    box.innerHTML = `<div class="rank-empty">还没有真实玩家成绩。<br>完成第一题后，所有玩家会共享同一个在线排行榜。</div>`;
    return;
  }
  box.innerHTML = rows.slice(0, 20).map((item, index) => {
    const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1;
    const isMe = item.playerId === state.playerId || (activeBoard === "store" && item.name === state.storeName);
    const sub = activeBoard === "store"
      ? `正确率 ${item.correctRate}% · ${item.players || 0}人 · 最强 ${item.bestStreak || 0}连胜`
      : `${escapeHtml(item.store || "未填写门店")} · ${item.title} · 正确率 ${item.correctRate}% · ${item.bestStreak || 0}连胜`;
    return `
      <div class="rank-row ${isMe ? "me" : ""} ${animated ? "rank-refresh" : ""}">
        <div class="rank-num">${medal}</div>
        <div class="rank-main">
          <div class="rank-name"><span>${escapeHtml(item.name)}</span><strong>${item.score || 0}分</strong></div>
          <div class="rank-stats">${sub}</div>
        </div>
      </div>
    `;
  }).join("");
}

function renderPlayer(stats = getStats()) {
  $("currentName").textContent = state.playerName || "玩家";
  $("currentStore").textContent = state.storeName || "门店";
  $("playerTitle").textContent = stats.title || "新手观察员";
  $("score").textContent = stats.score || 0;
  $("accuracy").textContent = `${stats.correctRate || 0}%`;
  $("streak").textContent = stats.streak || 0;
  $("roundCount").textContent = `第 ${stats.attempts || 0} 题`;
}

function showToast(message, warning = false) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.toggle("warning", warning);
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function escapeHtml(text) {
  return String(text).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function sample(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function difficultyClass(difficulty) {
  if (difficulty.includes("隐藏")) return "boss";
  if (difficulty.includes("地狱")) return "hell";
  if (difficulty.includes("困难")) return "hard";
  return "easy";
}

function pickCustomer() {
  let next = sample(customers);
  while (customers.length > 1 && next.name === state.lastCustomerName) next = sample(customers);
  state.lastCustomerName = next.name;
  return next;
}

function generateCustomer() {
  state.current = pickCustomer();
  state.answered = false;
  renderCustomer(state.current);
  renderOptions(state.current);
  resetLearningArea();
  $("answerResult").classList.add("hidden");
  showToast("今日顾客已进店，观察他的第一句话和行为特征！");
}

function renderCustomer(customer) {
  const pill = $("difficultyPill");
  pill.textContent = customer.difficulty;
  pill.className = `difficulty-pill ${difficultyClass(customer.difficulty)}`;
  $("customerCard").className = "customer-card";
  $("customerCard").innerHTML = `
    <div class="avatar-box">${customer.avatar}</div>
    <h4 class="customer-name">${escapeHtml(customer.name)}</h4>
    <div class="meta-tags">
      <span class="tag">${customer.age}岁</span>
      <span class="tag pink">${escapeHtml(customer.purpose)}</span>
      <span class="tag green">${escapeHtml(customer.mood)}</span>
    </div>
    <div class="speech">“${escapeHtml(customer.line)}”</div>
    <ul class="feature-list">
      ${customer.traits.map((trait) => `<li>${escapeHtml(trait)}</li>`).join("")}
    </ul>
  `;
}

function renderOptions(customer) {
  const wrong = shuffle(Object.keys(typeMeta).filter((type) => type !== customer.type)).slice(0, 3);
  const options = shuffle([customer.type, ...wrong]);
  $("options").classList.remove("locked");
  $("options").innerHTML = options.map((type, index) => `
    <button class="option-btn" data-type="${type}">
      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
      <span>${type}</span>
    </button>
  `).join("");
  document.querySelectorAll(".option-btn").forEach((button) => {
    button.addEventListener("click", () => answer(button));
  });
}

async function answer(button) {
  if (!state.current || state.answered) return;
  state.answered = true;
  const selected = button.dataset.type;
  const correct = selected === state.current.type;
  const stats = getStats();
  stats.attempts += 1;
  stats.history = stats.history || [];

  let delta = correct ? 10 : 2;
  let streakBonus = 0;
  if (correct) {
    stats.correct += 1;
    stats.streak += 1;
    stats.bestStreak = Math.max(stats.bestStreak || 0, stats.streak);
    if (stats.streak >= 3) streakBonus = 5;
    delta += streakBonus;
  } else {
    stats.streak = 0;
  }
  stats.score += delta;
  normalizeStats(stats);
  stats.history.unshift({ customer: state.current.name, type: state.current.type, selected, correct, delta, time: new Date().toISOString() });
  stats.history = stats.history.slice(0, 50);

  document.querySelectorAll(".option-btn").forEach((option) => {
    option.disabled = true;
    if (option.dataset.type === state.current.type) option.classList.add("correct");
  });
  if (!correct) button.classList.add("wrong");

  const result = $("answerResult");
  result.classList.remove("hidden");
  result.innerHTML = correct
    ? `✅ 正确！你看穿了顾客人格。<span class="score-pop">+${delta}分</span>${streakBonus ? `<span class="streak-pop">连胜奖励 +${streakBonus}</span>` : ""}`
    : `❌ 错误，但观察力正在升级。<span class="score-pop">+${delta}分</span><br>正确答案：${state.current.type}`;

  if (correct) {
    fireConfetti();
    if (stats.streak >= 2) showToast(`🔥 ${stats.streak}连胜！称号：${stats.title}`);
  } else {
    showToast("别急，高手也是从误判中练出来的。");
  }

  renderAnalysis(state.current);
  renderMaster(state.current);
  renderLeaderboard(true);
  await syncStatsSafely(stats);
}

function resetLearningArea() {
  $("analysisContent").className = "content-grid placeholder-grid";
  $("analysisContent").innerHTML = `<div class="placeholder">完成答题后解锁真实人格类型、识别依据和误判原因。</div>`;
  $("masterContent").className = "secret-grid placeholder-grid";
  $("masterContent").innerHTML = `<div class="placeholder">答题后自动出现店长高手接待秘籍。</div>`;
}

function renderAnalysis(customer) {
  const meta = typeMeta[customer.type];
  $("analysisContent").className = "content-grid";
  $("analysisContent").innerHTML = `
    <article class="info-card"><h4>真实人格类型</h4><p>${customer.type}</p></article>
    <article class="info-card"><h4>识别依据</h4><p>${meta.basis}</p></article>
    <article class="info-card"><h4>行为信号</h4><p>${customer.traits.join("；")}。</p></article>
    <article class="info-card"><h4>容易误判原因</h4><p>容易误判成「${meta.mistaken}」，因为表面行为相似，但决策按钮不同。</p></article>
    <article class="info-card"><h4>典型特征</h4><p>${meta.traits}</p></article>
    <article class="info-card"><h4>培训启发</h4><p>${meta.inspiration}</p></article>
  `;
}

function renderMaster(customer) {
  const [opening, question, communication, member, close, pitfall] = typeMeta[customer.type].master;
  $("masterContent").className = "secret-grid";
  $("masterContent").innerHTML = `
    <article class="secret-card"><h4>💬 推荐开场白</h4><p>“${opening}”</p></article>
    <article class="secret-card"><h4>❓ 推荐提问</h4><p>${question}</p></article>
    <article class="secret-card"><h4>🧩 推荐沟通策略</h4><p>${communication}</p></article>
    <article class="secret-card"><h4>💎 推荐会员策略</h4><p>${member}</p></article>
    <article class="secret-card"><h4>🤝 推荐成交策略</h4><p>${close}</p></article>
    <article class="secret-card"><h4>⚠️ 常见踩坑</h4><p>${pitfall}</p></article>
  `;
}

function fireConfetti() {
  const colors = ["#ff7a45", "#ffd166", "#20c997", "#4f8cff", "#8b5cf6", "#ff5c9a"];
  for (let index = 0; index < 38; index += 1) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = sample(colors);
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1300);
  }
}

async function startGame() {
  const name = $("playerName").value.trim();
  const store = $("storeName").value.trim();
  if (!name || !store) {
    $("loginTip").classList.add("show");
    (!name ? $("playerName") : $("storeName")).focus();
    return;
  }
  state.playerName = name;
  state.storeName = store;
  localStorage.setItem("pg_player_name", name);
  localStorage.setItem("pg_store_name", store);
  $("loginPage").classList.add("hidden");
  $("gamePage").classList.remove("hidden");
  const stats = getStats();
  await syncStatsSafely(stats);
  renderLeaderboard();
  showToast(`${name}，欢迎代表 ${store} 解锁顾客人格！`);
}

function setupTabs() {
  document.querySelectorAll(".board-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      activeBoard = tab.dataset.board;
      document.querySelectorAll(".board-tab").forEach((item) => item.classList.toggle("active", item === tab));
      renderLeaderboard(true);
    });
  });
}

async function boot() {
  $("startBtn").addEventListener("click", startGame);
  $("playerName").addEventListener("keydown", (event) => { if (event.key === "Enter") startGame(); });
  $("storeName").addEventListener("keydown", (event) => { if (event.key === "Enter") startGame(); });
  $("playerName").addEventListener("input", () => $("loginTip").classList.remove("show"));
  $("storeName").addEventListener("input", () => $("loginTip").classList.remove("show"));
  $("generateBtn").addEventListener("click", generateCustomer);
  setupTabs();

  if (state.playerName) $("playerName").value = state.playerName;
  if (state.storeName) $("storeName").value = state.storeName;
  renderPlayer();
  renderLeaderboard();
  await initFirebase();
}

boot();







