const scenarios = {
  national: {
    title: 'National only', target: 'No sharing', subtarget: 'National inference', label: 'No outbound data', state: 'LOCAL ONLY', loss: '8', exported: 'None', owner: 'National team',
    message: country => `“Dry spell watch is active in ${country}. Review local soil moisture and district forecasts before adjusting planting guidance.”`, feedback: 'Scenario completed on national node.'
  },
  regional: {
    title: 'Regional learning circle', target: 'Regional circle', subtarget: 'Approved update only', label: 'Screened model update', state: 'OPT-IN', loss: '13', exported: 'Model update', owner: 'Country + regional council',
    message: country => `“Neighboring drought patterns strengthen the risk estimate. ${country} records stay local; a screened update returns after the regional round.”`, feedback: 'Regional round simulated. Raw records remain in-country.'
  },
  global: {
    title: 'Global open commons', target: 'Open baseline', subtarget: 'Public weather + research', label: 'Low-sensitivity sources', state: 'PUBLIC INPUTS', loss: '10', exported: 'None', owner: 'National team',
    message: country => `“Open seasonal outlooks and public agronomy guidance are available to ${country}. National data remains local and the team chooses whether to adopt the baseline.”`, feedback: 'Open baseline applied locally. No national data exported.'
  }
};

let selectedLevel = 'national';
const countrySelect = document.querySelector('#country');
const flowLine = document.querySelector('.flow-line i');

document.querySelectorAll('.level-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.level-button').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    selectedLevel = button.dataset.level;
    updateResults(false);
  });
});

countrySelect.addEventListener('change', () => updateResults(false));
document.querySelector('#run-scenario').addEventListener('click', () => updateResults(true));

function updateResults(animate) {
  const scenario = scenarios[selectedLevel];
  const country = countrySelect.value;
  document.querySelector('#result-title').textContent = scenario.title;
  document.querySelector('#flow-country-name').textContent = country;
  document.querySelector('#flow-target').textContent = scenario.target;
  document.querySelector('#flow-subtarget').textContent = scenario.subtarget;
  document.querySelector('#flow-label').textContent = scenario.label;
  document.querySelector('#flow-state').textContent = scenario.state;
  document.querySelector('#loss-stat').innerHTML = `${scenario.loss}<span>%</span>`;
  document.querySelector('#export-stat').textContent = scenario.exported;
  document.querySelector('#owner-stat').textContent = scenario.owner;
  document.querySelector('#agent-message').textContent = scenario.message(country);
  const feedback = document.querySelector('#run-feedback');
  if (animate) {
    flowLine.classList.remove('animate');
    requestAnimationFrame(() => requestAnimationFrame(() => flowLine.classList.toggle('animate', selectedLevel !== 'national')));
    feedback.textContent = scenario.feedback;
    feedback.classList.add('show');
    window.setTimeout(() => feedback.classList.remove('show'), 2800);
  } else {
    flowLine.classList.toggle('animate', selectedLevel !== 'national');
    feedback.classList.remove('show');
  }
}
