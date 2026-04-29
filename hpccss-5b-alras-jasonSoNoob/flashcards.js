const vocabularyList = [
  ["Geared toward", "針對 / 旨在", "Phrasal Verb / Adjective Phrase", "The new curriculum is geared toward helping students develop critical thinking skills."],
  ["Vital", "至關重要的 / 必不可少的", "Adjective", "It is vital to stay hydrated during strenuous exercise."],
  ["Utmost importance", "最重要 / 頂級重要", "Noun Phrase", "Safety is of the utmost importance in this laboratory."],
  ["Paramount importance", "首要 / 至高無上的重要性", "Noun Phrase", "Protecting user data is of paramount importance to our company."],
  ["Hone", "磨練 / 提升（技能）", "Verb", "She traveled to Paris to hone her culinary skills."],
  ["Nurture", "培育 / 養育", "Verb", "Teachers play a crucial role in nurturing a child's love for learning."],
  ["Status quo", "現狀", "Noun", "The bold young politician wants to challenge the status quo and push for reform."],
  ["A myriad of", "無數的 / 極大量的", "Quantifier Phrase", "The night sky was illuminated by a myriad of stars."],
  ["Savour", "品味 / 享受", "Verb", "Take the time to savour every bite of this exquisite dessert."],
  ["Treasure", "珍視 / 寶藏", "Verb", "I will always treasure the memories we made on that incredible trip."],
  ["Enchanting", "迷人的 / 令人陶醉的", "Adjective", "The lush garden looked enchanting in the soft moonlight."],
  ["Pour a lot of effort", "投入大量心血", "Verb Phrase", "They poured a lot of effort into making the charity event a massive success."],
  ["Awe-inspiring", "令人敬畏的 / 壯觀的", "Adjective", "The view of the valley from the mountain peak was truly awe-inspiring."],
  ["Alluring", "誘人的 / 有魅力的", "Adjective", "The scent of freshly baked bread coming from the bakery was too alluring to resist."],
  ["Spare no effort", "不遺餘力", "Verb Phrase", "The rescue team will spare no effort to find the missing hikers."],
  ["Propel into", "推進 / 驅使進入", "Phrasal Verb", "The unexpected success of his first novel propelled him into international stardom."],
  ["Spectacle", "壯觀場面 / 奇觀", "Noun", "The grand opening ceremony of the Olympics was a magnificent spectacle."],
  ["Precious", "珍貴的", "Adjective", "Clean drinking water is a precious resource that we must conserve."],
  ["Unveil", "揭露 / 公布", "Verb", "The tech giant plans to unveil its revolutionary new smartphone next week."],
  ["Unearth", "挖掘 / 發現", "Verb", "Archaeologists recently unearthed the ancient ruins of a lost civilization."],
  ["Allegations", "指控 / 指稱（通常指未經證實的）", "Noun", "The CEO vehemently denied the allegations of financial fraud."],
  ["Accusations", "控告 / 指責", "Noun", "He faced severe accusations of misconduct from his former colleagues."],
  ["Warrant", "使...顯得必要 / 授權", "Verb", "The current minor issue does not warrant such drastic measures."],
  ["Need", "需要", "Noun / Verb", "There is an urgent need for medical supplies in the disaster-affected area."],
  ["Transpired", "發生 / 揭曉", "Verb", "It later transpired that he had known about the secret plan all along."],
  ["Behind the scenes", "在幕後", "Idiom / Adverbial Phrase", "The audience only sees the final show, but much of the hard work happens behind the scenes."],
  ["Attributed to", "歸因於", "Phrasal Verb", "Her rapid promotion can be directly attributed to her relentless hard work."],
  ["Inviting concerns about", "引起對...的擔憂", "Phrase", "The sudden drop in company profits is inviting concerns about its long-term stability."],
  ["Flag up", "標示出 / 引起注意", "Phrasal Verb", "The external audit flagged up several irregularities in the accounting records."],
  ["Point out", "指出", "Phrasal Verb", "I would like to point out that this project requires immediate funding to proceed."],
  ["Relentless efforts", "不懈的努力", "Noun Phrase", "Through her relentless efforts, the charity raised millions for cancer research."],
  ["Rooting for", "支持 / 加油", "Phrasal Verb", "The whole town is rooting for the local team to win the national championship."],
  ["Apologetic", "道歉的 / 認錯的", "Adjective", "He was deeply apologetic for accidentally deleting the important files."],
  ["Confrontational", "對抗性的 / 挑釁的", "Adjective", "Try to resolve the workplace dispute calmly without being overly confrontational."],
  ["Comprise", "包含 / 由...組成", "Verb", "The advisory committee is comprised of experts from various scientific fields."],
  ["Acquainting", "使認識 / 使熟悉", "Verb (Participle)", "Spend some time acquainting yourself with the new software before starting the task."],
  ["Ground-breaking", "開創性的 / 突破性的", "Adjective", "The scientists published a ground-breaking study on renewable energy sources."],
  ["Transcend", "超越 / 勝過", "Verb", "Music is often described as a universal language that transcends cultural boundaries."],
  ["Intriguing", "引人入勝的 / 有趣的", "Adjective", "The detective found an intriguing clue hidden beneath the floorboards at the crime scene."],
  ["Revel", "狂歡 / 陶醉", "Verb", "They stayed up all night to revel in the joy of their unexpected victory."],
  ["Weary", "疲憊的", "Adjective", "The weary travelers finally reached their destination after a grueling 20-hour journey."],
  ["Fatigue", "疲勞", "Noun", "Driver fatigue is a major cause of late-night highway accidents."],
  ["Depraved", "墮落的 / 腐敗的", "Adjective", "The villain's depraved actions shocked the citizens of the entire city."],
  ["Gruelling", "折磨人的 / 艱辛的", "Adjective", "The marathon runners faced a gruelling race under the intense summer heat."],
  ["Probe", "探測器 / 探查", "Noun", "The space agency launched a robotic probe to study the harsh atmosphere of Venus."],
  ["Tint", "色彩 / 染", "Noun", "The setting sun gave the clouds a beautiful pink and orange tint."],
  ["Unveil", "揭幕 / 發表", "Verb", "The mayor will unveil the new bronze statue in the town square tomorrow morning."],
  ["Beam", "露出燦爛的笑容 / 發射", "Verb", "She couldn't help but beam with pride when her son received the academic award."],
  ["Girdle", "環繞 / 束帶", "Verb", "A thick ring of ancient pine trees girdles the quiet, isolated lake."],
  ["Unfathomably", "深不可測地 / 難以理解地", "Adverb", "The universe is unfathomably vast and complex for the human mind to fully grasp."],
  ["Frontier", "邊境 / 前沿", "Noun", "Artificial intelligence is considered the new frontier in technological advancement."],
  ["Dwarf", "矮 / 使顯得矮小", "Verb", "The magnificent new skyscrapers dwarf the older, historical buildings in the downtown area."],
  ["Boulders", "巨石", "Noun", "The experienced hikers carefully navigated around the massive boulders on the steep trail."],
  ["Prevail", "佔上風", "Verb", "Despite the many challenges, we believe that truth and justice will ultimately prevail."]
];

const cards = vocabularyList.map(item => ({
  vocab: item[0],
  meaning: item[1],
  usage: item[2],
  sentence: item[3]
}));

let currentIndex = 0;

function renderCard() {
  if (!cards.length) {
    document.getElementById('loading').innerText = 'No vocabulary available.';
    return;
  }

  const card = cards[currentIndex];
  const cardEl = document.getElementById('card');
  cardEl.classList.remove('flipped');

  document.getElementById('vocab-display').innerText = card.vocab || '';
  document.getElementById('meaning-display').innerText = card.meaning || '';
  document.getElementById('usage-display').innerText = card.usage ? `Usage: ${card.usage}` : '';
  document.getElementById('sentence-display').innerText = card.sentence || '';
  document.getElementById('progress-text').innerText = `Card ${currentIndex + 1} of ${cards.length}`;

  document.getElementById('prev-btn').disabled = currentIndex === 0;
  document.getElementById('next-btn').disabled = currentIndex === cards.length - 1;
  document.getElementById('loading').style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('app').classList.remove('hidden');
}

function flipCard() {
  document.getElementById('card').classList.toggle('flipped');
}

function nextCard() {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    renderCard();
  }
}

function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    renderCard();
  }
}
