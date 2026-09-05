function $(id) { return document.getElementById(id); }
function detectDemo(topic) {
  const t = (topic || '').toLowerCase();
  return ['shoulder', 'rotator', 'rcrsp', 'cuff', 'steps-nz', 'stepped care'].some((h) => t.includes(h));
}
function genericJourney(data) {
  const topic = data.topic.trim();
  const place = data.place || 'Aotearoa New Zealand';
  const role = data.role || 'clinician-researcher';
  return {
    spark: {
      wide: 'What does the literature say about ' + topic + '?',
      rec: 'In ' + place + ', which people affected by “' + topic + '” improve with a short first step, and who is still left behind?',
      heavy: 'Is a national trial of ' + topic + ' equivalent and cost-effective across the whole system?'
    },
    field: [
      ['Language', 'Name the problem the way recent papers name it.'],
      ['First-line care', 'Find the review or guideline that already settled first-line treatment.'],
      ['Local cluster', 'Who in ' + place + ' already publishes on this? Cite them.'],
      ['System', 'Money, waits, coverage, rurality, ethnicity.'],
      ['Gap', 'The finishable paper is usually implementation, audit, or equity of access.'],
      ['Ignore', 'Tiny head-to-head trials that will not change Monday.']
    ],
    shapeTitle: 'What changed when we treated “' + topic + '” as a path, not a pile of sessions?',
    home: [
      ['First home', 'New Zealand Journal of Physiotherapy — if the work is physiotherapy and Aotearoa-shaped.'],
      ['Second', 'A specialty journal that already publishes this condition.'],
      ['Do not send first', 'A general mega-journal. Earn the local paper.']
    ],
    li: 'I am mapping “' + topic + '” in ' + place + ' as a ' + role + '.\n\nThe question is who improves after a short first step — and who never gets that step.\n\nStride drafted the path. I will write the paper.',
    short: topic + ' in ' + place + ': first step, then step up only if needed.',
    clinic: 'Subject: How we will start “' + topic + '” from next Monday\n\nVisit 1–2: assessment, education, one agreed first-line plan.\nReview: who is better, who steps up.'
  };
}
function escapeHtml(s) {
  return String(s).replaceAll('&', '&').replaceAll('<', '<').replaceAll('>', '>').replaceAll('"', '"');
}
function rippleHtml(li, short, clinic) {
  return '<p class="layer-num">Layer 06 · Ripple</p><h2>Impact kit</h2>' +
    '<label>LinkedIn</label><textarea class="post" id="li">' + escapeHtml(li) + '</textarea>' +
    '<button class="btn" data-copy="li">Copy LinkedIn</button>' +
    '<label>Short post</label><textarea class="post" id="x" style="min-height:80px">' + escapeHtml(short) + '</textarea>' +
    '<button class="btn" data-copy="x">Copy short post</button>' +
    '<label>Clinic email</label><textarea class="post" id="clinic">' + escapeHtml(clinic) + '</textarea>' +
    '<button class="btn" data-copy="clinic">Copy email</button>';
}
function bindCopy() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.onclick = () => {
      navigator.clipboard.writeText($(btn.getAttribute('data-copy')).value);
      btn.textContent = 'Copied';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1200);
    };
  });
}
function renderGeneric(j, data) {
  $('workspace').classList.remove('hidden');
  $('banner').classList.remove('hidden');
  $('banner').textContent = 'Template journey — swap every claim for a paper you have opened before you post.';
  $('l1').innerHTML = '<p class="layer-num">Layer 01 · Spark</p><h2>' + escapeHtml(data.topic) + '</h2>' +
    '<div class="qbox rec"><strong>Recommended</strong>' + escapeHtml(j.spark.rec) + '</div>' +
    '<div class="qbox"><strong>Te Tiriti checkpoint</strong>Default is inclusion of Māori. This template is not Kaupapa Māori.</div>';
  $('l2').innerHTML = '<p class="layer-num">Layer 02 · Field</p><div class="map">' +
    j.field.map(function (x) { return '<div class="node"><b>' + escapeHtml(x[0]) + '</b><p>' + escapeHtml(x[1]) + '</p></div>'; }).join('') + '</div>';
  $('l3').innerHTML = '<p class="layer-num">Layer 03 · Evidence</p><p class="muted">Add 6–10 papers. Do not cite a protocol as results.</p>';
  $('l4').innerHTML = '<p class="layer-num">Layer 04 · Shape</p><p><em>' + escapeHtml(j.shapeTitle) + '</em></p>';
  $('l5').innerHTML = '<p class="layer-num">Layer 05 · Home</p>' +
    j.home.map(function (x) { return '<div class="node" style="margin-bottom:8px"><b>' + escapeHtml(x[0]) + '</b><p>' + escapeHtml(x[1]) + '</p></div>'; }).join('');
  $('l6').innerHTML = rippleHtml(j.li, j.short, j.clinic);
  bindCopy();
  $('spark').scrollIntoView({ behavior: 'smooth' });
}
function onGenerate(ev) {
  ev.preventDefault();
  const data = { topic: $('topic').value, place: $('place').value, role: $('role').value };
  if (!data.topic.trim()) { $('form-status').textContent = 'Add a topic.'; return; }
  if (detectDemo(data.topic)) {
    window.location.href = 'stride-demo-rcrsp-nz.html';
    return;
  }
  renderGeneric(genericJourney(data), data);
}
document.addEventListener('DOMContentLoaded', function () {
  var form = $('gen-form');
  if (form) form.addEventListener('submit', onGenerate);
  var demo = $('open-demo');
  if (demo) demo.addEventListener('click', function (e) { e.preventDefault(); window.location.href = 'stride-demo-rcrsp-nz.html'; });
});
