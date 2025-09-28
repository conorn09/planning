// Insurance Planning Interactive Features

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing insurance features...');
    
    // Initialize all interactive features
    initLifeInsuranceCalculator();
    initRiskAssessment();
    initProtectionIcons();
    initCounterAnimations();
});

// Life Insurance Calculator
function initLifeInsuranceCalculator() {
    console.log('Initializing life insurance calculator...');
    
    // Add event listeners to all input fields
    const inputIds = [
        'credit-cards', 'personal-loans', 'other-debt',
        'annual-income', 'income-years',
        'mortgage-balance', 'home-equity', 'property-taxes',
        'num-children', 'education-cost'
    ];
    
    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            console.log('Found and adding listener to:', id);
            element.addEventListener('input', calculateInsuranceNeeds);
            element.addEventListener('change', calculateInsuranceNeeds);
        } else {
            console.log('Element not found:', id);
        }
    });
    
    // Initial calculation
    calculateInsuranceNeeds();
}

function calculateInsuranceNeeds() {
    console.log('Calculating insurance needs...');
    
    // Get all input values
    const creditCards = getInputValue('credit-cards');
    const personalLoans = getInputValue('personal-loans');
    const otherDebt = getInputValue('other-debt');
    const debtTotal = creditCards + personalLoans + otherDebt;
    
    const annualIncome = getInputValue('annual-income');
    const incomeYears = getInputValue('income-years') || 10;
    const incomeTotal = annualIncome * incomeYears;
    
    const mortgageBalance = getInputValue('mortgage-balance');
    const homeEquity = getInputValue('home-equity');
    const propertyTaxes = getInputValue('property-taxes');
    const mortgageTotal = mortgageBalance + homeEquity + (propertyTaxes * 5);
    
    const numChildren = getInputValue('num-children') || 0;
    const educationCost = getInputValue('education-cost') || 200000;
    const educationTotal = numChildren * educationCost;
    
    console.log('Calculated totals:', { debtTotal, incomeTotal, mortgageTotal, educationTotal });
    
    // Update section totals
    updateDisplay('debt-total', debtTotal);
    updateDisplay('income-total', incomeTotal);
    updateDisplay('mortgage-total', mortgageTotal);
    updateDisplay('education-total', educationTotal);
    
    // Update results section
    updateDisplay('result-debt', debtTotal);
    updateDisplay('result-income', incomeTotal);
    updateDisplay('result-mortgage', mortgageTotal);
    updateDisplay('result-education', educationTotal);
    
    // Calculate and display total
    const totalCoverage = debtTotal + incomeTotal + mortgageTotal + educationTotal;
    updateDisplay('total-coverage', totalCoverage);
    
    // Update recommendation
    updateRecommendation(totalCoverage, annualIncome);
}

function getInputValue(id) {
    const element = document.getElementById(id);
    if (element) {
        const value = parseFloat(element.value) || 0;
        console.log(`${id}: ${value}`);
        return value;
    }
    console.log(`Element ${id} not found`);
    return 0;
}

function updateDisplay(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = formatNumber(value);
        console.log(`Updated ${id} to ${value}`);
    } else {
        console.log(`Display element ${id} not found`);
    }
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(Math.round(num));
}

function updateRecommendation(totalCoverage, annualIncome) {
    const element = document.getElementById('recommendation-text');
    if (!element) return;
    
    let recommendation = '';
    
    if (totalCoverage === 0) {
        recommendation = 'Enter your information above to see your personalized life insurance recommendation.';
    } else if (totalCoverage < 100000) {
        recommendation = 'Based on your inputs, a basic term life insurance policy would provide adequate coverage.';
    } else if (totalCoverage < 500000) {
        recommendation = 'Consider a term life insurance policy. This should provide solid financial protection for your family.';
    } else if (totalCoverage < 1000000) {
        recommendation = 'A substantial life insurance policy is recommended. Consider term life insurance for cost-effectiveness.';
    } else {
        recommendation = 'Given your significant financial obligations, consider a combination of term and permanent life insurance policies.';
    }
    
    if (annualIncome > 0 && totalCoverage > 0) {
        const multiple = (totalCoverage / annualIncome).toFixed(1);
        recommendation += ` This represents ${multiple}x your annual income.`;
    }
    
    element.textContent = recommendation;
}

// Reset calculator function
function resetCalculator() {
    const inputIds = [
        'credit-cards', 'personal-loans', 'other-debt',
        'annual-income', 'mortgage-balance', 'home-equity', 
        'property-taxes'
    ];
    
    inputIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });
    
    // Reset selects to default
    const incomeYears = document.getElementById('income-years');
    if (incomeYears) incomeYears.value = '10';
    
    const numChildren = document.getElementById('num-children');
    if (numChildren) numChildren.value = '2';
    
    const educationCost = document.getElementById('education-cost');
    if (educationCost) educationCost.value = '200000';
    
    calculateInsuranceNeeds();
}



// Risk Assessment Tool
function initRiskAssessment() {
    const questions = document.querySelectorAll('.question');
    const optionBtns = document.querySelectorAll('.option-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const riskScore = document.getElementById('riskScore');
    const gapList = document.getElementById('gapList');
    const meterNeedle = document.querySelector('.meter-needle');

    let currentQuestion = 1;
    let totalScore = 0;
    let identifiedGaps = new Set();
    const answers = {};

    // Option button clicks
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const question = this.closest('.question');
            const questionNum = question.getAttribute('data-question');

            // Remove previous selection
            question.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));

            // Add selection to clicked button
            this.classList.add('selected');

            // Store answer
            const value = parseInt(this.getAttribute('data-value'));
            const gaps = this.getAttribute('data-gap');

            answers[questionNum] = {
                value: value,
                gaps: gaps ? gaps.split(',') : []
            };

            // Enable next button
            nextBtn.disabled = false;

            // Update score and gaps
            updateRiskAssessment();
        });
    });

    // Navigation buttons
    nextBtn.addEventListener('click', () => {
        if (currentQuestion < questions.length) {
            currentQuestion++;
            showQuestion(currentQuestion);
            updateNavigation();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 1) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateNavigation();
        }
    });

    function showQuestion(num) {
        questions.forEach((q, index) => {
            q.classList.remove('active');
            if (index + 1 === num) {
                q.classList.add('active');
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index < num) {
                dot.classList.add('active');
            }
        });
    }

    function updateNavigation() {
        prevBtn.disabled = currentQuestion === 1;

        const currentQuestionEl = document.querySelector(`[data-question="${currentQuestion}"]`);
        const hasSelection = currentQuestionEl && currentQuestionEl.querySelector('.option-btn.selected');

        if (currentQuestion === questions.length) {
            nextBtn.textContent = 'Complete Assessment';
            nextBtn.disabled = !hasSelection;
        } else {
            nextBtn.textContent = 'Next';
            nextBtn.disabled = !hasSelection;
        }
    }

    function updateRiskAssessment() {
        // Calculate total risk score
        totalScore = 0;
        identifiedGaps.clear();

        Object.values(answers).forEach(answer => {
            totalScore += answer.value;
            answer.gaps.forEach(gap => identifiedGaps.add(gap));
        });

        // Update risk score display
        if (riskScore) {
            riskScore.textContent = Math.min(totalScore, 100);
        }

        // Update meter needle
        if (meterNeedle) {
            const angle = (totalScore / 100) * 160 - 80; // -80 to 80 degrees
            meterNeedle.style.transform = `rotate(${angle}deg)`;
        }

        // Update protection gaps
        updateProtectionGaps();
    }

    function updateProtectionGaps() {
        if (!gapList) return;

        const gapDescriptions = {
            'life': 'Life Insurance - Protect your family\'s income',
            'disability': 'Disability Insurance - Protect your earning ability',
            'education': 'Education Funding - Secure children\'s future',
            'estate': 'Estate Planning - Wealth transfer strategies',
            'property': 'Property Insurance - Protect your home and assets'
        };

        gapList.innerHTML = '';

        if (identifiedGaps.size === 0) {
            const item = document.createElement('div');
            item.className = 'gap-item';
            item.textContent = 'Complete assessment to see recommendations';
            gapList.appendChild(item);
        } else {
            identifiedGaps.forEach(gap => {
                const item = document.createElement('div');
                item.className = 'gap-item identified';
                item.innerHTML = `⚠️ ${gapDescriptions[gap] || gap}`;
                gapList.appendChild(item);
            });

            // Add recommendation
            const recommendation = document.createElement('div');
            recommendation.className = 'gap-item';
            recommendation.innerHTML = `💡 Recommended: Schedule consultation to address ${identifiedGaps.size} protection gap${identifiedGaps.size > 1 ? 's' : ''}`;
            gapList.appendChild(recommendation);
        }
    }
}

// Protection Icons Animation
function initProtectionIcons() {
    const protectionIcons = document.querySelectorAll('.protection-icon');

    protectionIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            const protectionType = this.getAttribute('data-protection');

            // Add glow effect to related elements
            this.style.transform = 'scale(1.2)';
            this.querySelector('.icon-circle').style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.6)';

            // Show tooltip or additional info
            showProtectionTooltip(this, protectionType);
        });

        icon.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
            this.querySelector('.icon-circle').style.boxShadow = 'none';
            hideProtectionTooltip();
        });
    });
}

function showProtectionTooltip(element, type) {
    const tooltips = {
        'life': 'Protects your family\'s financial future',
        'health': 'Covers medical expenses and treatments',
        'disability': 'Replaces income if unable to work',
        'property': 'Protects your home and belongings',
        'auto': 'Covers vehicle damage and liability'
    };

    // Create or update tooltip
    let tooltip = document.querySelector('.protection-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'protection-tooltip';
        document.body.appendChild(tooltip);
    }

    tooltip.textContent = tooltips[type] || 'Insurance protection';
    tooltip.style.display = 'block';

    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.bottom + 10 + 'px';
}

function hideProtectionTooltip() {
    const tooltip = document.querySelector('.protection-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// Counter Animations for Stats
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const animateCounter = (counter) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target < 10) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target < 10) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = target;
                }
            }
        };

        updateCounter();
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Add tooltip styles
const tooltipCSS = `
.protection-tooltip {
    position: fixed;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.875rem;
    z-index: 1000;
    transform: translateX(-50%);
    pointer-events: none;
    display: none;
    animation: tooltipFadeIn 0.3s ease;
}

@keyframes tooltipFadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* Enhanced hover effects */
.type-card:hover {
    animation: cardPulse 0.6s ease-in-out;
}

@keyframes cardPulse {
    0% { transform: translateY(-10px) scale(1.02); }
    50% { transform: translateY(-15px) scale(1.05); }
    100% { transform: translateY(-10px) scale(1.02); }
}

/* Smooth transitions for all interactive elements */
.protection-icon,
.option-btn,
.type-card,
.detail-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Loading animation for assessment */
.assessment-loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
`;

// Inject tooltip styles
const style = document.createElement('style');
style.textContent = tooltipCSS;
document.head.appendChild(style);