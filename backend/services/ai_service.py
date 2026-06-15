import os
import re
import json
from openai import AsyncOpenAI

# Get API Key from environment or use a placeholder for development
api_key = os.getenv("OPENAI_API_KEY", "sk-placeholder")
client = AsyncOpenAI(api_key=api_key)

async def get_ai_response(history: list, new_message: str):
    """
    Simulates getting an AI response for the interview chat.
    """
    messages = [{"role": msg["role"], "content": msg["content"]} for msg in history]
    messages.append({"role": "user", "content": new_message})
    
    # In a real scenario, you would call OpenAI API:
    # response = await client.chat.completions.create(
    #     model="gpt-4",
    #     messages=messages
    # )
    # return response.choices[0].message.content
    
    return "This is a simulated AI response. How would you optimize this algorithm?"

async def analyze_speech_to_text(audio_file_path: str):
    """
    Uses OpenAI Whisper to convert speech to text.
    """
    # with open(audio_file_path, "rb") as audio_file:
    #     transcript = await client.audio.transcriptions.create(
    #       model="whisper-1", 
    #       file=audio_file
    #     )
    # return transcript.text
    return "This is simulated transcribed text from the audio."

def analyze_resume_locally(text: str):
    # ─────────────────────────────────────────────
    # KEYWORD BANKS
    # ─────────────────────────────────────────────
    technical_keywords = [
        # Programming Languages
        'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'ruby', 'php',
        'swift', 'kotlin', 'go', 'rust', 'scala', 'r', 'matlab', 'perl', 'bash',
        'shell', 'groovy', 'dart', 'elixir', 'haskell', 'lua', 'objective-c',
        'assembly', 'cobol', 'fortran', 'vba', 'powershell',

        # Web Frameworks & Libraries
        'react', 'angular', 'vue', 'nextjs', 'next.js', 'nuxt', 'svelte',
        'django', 'flask', 'fastapi', 'spring', 'springboot', 'spring boot',
        'express', 'rails', 'laravel', 'asp.net', '.net', 'struts',
        'gatsby', 'remix', 'astro', 'backbone', 'ember', 'jquery',

        # Databases
        'sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'redis', 'cassandra',
        'elasticsearch', 'dynamodb', 'sqlite', 'oracle', 'firebase', 'supabase',
        'couchdb', 'neo4j', 'mariadb', 'mssql', 'hbase', 'influxdb',

        # Cloud Platforms & Services
        'aws', 'gcp', 'azure', 'heroku', 'vercel', 'netlify', 'cloudflare',
        'digitalocean', 'lambda', 'ec2', 's3', 'rds', 'eks', 'ecs', 'gke',
        'cloud functions', 'bigquery', 'cloud run', 'fargate', 'cloudwatch',

        # DevOps & Infrastructure
        'docker', 'kubernetes', 'jenkins', 'github actions', 'gitlab ci',
        'terraform', 'ansible', 'nginx', 'apache', 'helm', 'prometheus',
        'grafana', 'vault', 'consul', 'puppet', 'chef', 'packer', 'vagrant',
        'linux', 'unix', 'bash scripting', 'ci/cd', 'devops', 'sre',

        # AI / ML / Data Science
        'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'keras',
        'scikit-learn', 'sklearn', 'pandas', 'numpy', 'matplotlib', 'seaborn',
        'nlp', 'natural language processing', 'computer vision', 'llm',
        'hugging face', 'transformers', 'openai', 'langchain', 'rag',
        'data analysis', 'data science', 'big data', 'spark', 'hadoop',
        'airflow', 'mlflow', 'feature engineering', 'xgboost', 'lightgbm',

        # APIs & Integration
        'rest api', 'graphql', 'grpc', 'websocket', 'soap', 'openapi', 'swagger',
        'postman', 'oauth', 'jwt', 'webhook',

        # Architecture & Methodology
        'microservices', 'serverless', 'event-driven', 'distributed systems',
        'system design', 'api gateway', 'message queue', 'kafka', 'rabbitmq',
        'sqs', 'sns', 'pubsub',

        # Tools & Platforms
        'git', 'github', 'gitlab', 'bitbucket', 'jira', 'confluence',
        'figma', 'adobe xd', 'sketch', 'notion', 'slack',

        # Certifications as keywords
        'aws certified', 'google cloud certified', 'azure certified',
        'pmp', 'cissp', 'comptia', 'cka', 'ckad', 'ceh', 'ccna', 'ccnp',

        # Security
        'cybersecurity', 'penetration testing', 'owasp', 'ssl', 'tls',
        'encryption', 'iam', 'siem', 'zero trust',

        # Mobile
        'android', 'ios', 'react native', 'flutter', 'xamarin',

        # Testing
        'unit testing', 'integration testing', 'selenium', 'cypress', 'jest',
        'pytest', 'junit', 'test driven development', 'tdd', 'bdd',

        # Miscellaneous
        'blockchain', 'web3', 'solidity', 'iot', 'embedded systems',
        'fpga', 'raspberry pi', 'arduino',
    ]

    soft_skills = [
        'leadership', 'teamwork', 'communication', 'problem solving',
        'problem-solving', 'analytical', 'collaborative', 'innovative',
        'mentored', 'mentoring', 'cross-functional', 'agile', 'scrum',
        'kanban', 'stakeholder management', 'presentation', 'adaptable',
        'adaptability', 'critical thinking', 'time management', 'creativity',
        'negotiation', 'conflict resolution', 'decision making', 'empathy',
        'strategic thinking', 'attention to detail', 'self-motivated',
        'results-driven', 'customer focused',
    ]

    action_verbs = [
        'achieved', 'improved', 'developed', 'managed', 'created', 'designed',
        'implemented', 'led', 'coordinated', 'analyzed', 'built', 'delivered',
        'established', 'generated', 'increased', 'launched', 'optimized',
        'reduced', 'resolved', 'streamlined', 'supervised', 'trained',
        'transformed', 'collaborated', 'contributed', 'executed', 'architected',
        'automated', 'deployed', 'engineered', 'integrated', 'migrated',
        'modernized', 'orchestrated', 'pioneered', 'refactored', 'scaled',
        'secured', 'spearheaded', 'standardized', 'strategized', 'upgraded',
    ]

    certification_keywords = [
        'certified', 'certification', 'certificate', 'aws certified',
        'google cloud', 'azure certified', 'pmp', 'cissp', 'comptia',
        'cka', 'ckad', 'ceh', 'ccna', 'ccnp', 'itil', 'six sigma',
        'professional certificate', 'credential',
    ]

    portfolio_markers = [
        'github.com', 'gitlab.com', 'portfolio', 'personal website',
        'behance', 'dribbble', 'personal site', 'my website',
    ]

    edu_keywords = [
        'bachelor', 'master', 'degree', 'university', 'college', 'gpa',
        'b.tech', 'm.tech', 'bca', 'mca', 'phd', 'associate',
        'diploma', 'graduate', 'undergraduate', 'b.sc', 'm.sc', 'mba',
        'b.e.', 'm.e.',
    ]

    # ─────────────────────────────────────────────
    # PREPROCESSING
    # ─────────────────────────────────────────────
    lower_text = text.lower()
    words = lower_text.split()
    word_count = len(words)

    # ─────────────────────────────────────────────
    # 1. CONTACT INFO SCORE
    # ─────────────────────────────────────────────
    has_email = bool(re.search(r'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}', lower_text))
    has_phone = bool(re.search(r'\b\d{10}\b|\b\d{3}[.\-\s]?\d{3}[.\-\s]?\d{4}\b|\+\d[\d\s\-]{9,}', lower_text))
    has_linkedin = 'linkedin' in lower_text

    contact_score = 0
    if has_email:    contact_score += 30
    if has_phone:    contact_score += 30
    if has_linkedin: contact_score += 25

    # Portfolio bonus (portfolio detection feeds into contact score)
    portfolio_found = [p for p in portfolio_markers if p in lower_text]
    if portfolio_found:
        contact_score = min(100, contact_score + 15)

    contact_score = max(10, contact_score)

    # ─────────────────────────────────────────────
    # 2. TECHNICAL KEYWORDS SCORE
    # ─────────────────────────────────────────────
    tech_found = [k for k in technical_keywords if k in lower_text]
    # Target: 12 keywords → 100 pts; scale linearly
    tech_score = min(100, int((len(tech_found) / 12) * 100))

    # ─────────────────────────────────────────────
    # 3. ACTION VERBS SCORE
    # ─────────────────────────────────────────────
    verbs_found = [v for v in action_verbs if v in lower_text]
    verb_score = min(100, int((len(verbs_found) / 8) * 100))

    # ─────────────────────────────────────────────
    # 4. QUANTIFIABLE METRICS SCORE
    # ─────────────────────────────────────────────
    metrics_matches = (
        re.findall(r'\d+\s*%', lower_text) +
        re.findall(r'\$\s*\d+[\d,\.]*[kmb]?', lower_text) +
        re.findall(r'\d+x\b', lower_text) +
        re.findall(r'\b\d{4,}\b', lower_text)   # large numbers (user count, revenue, etc.)
    )
    metrics_score = min(100, int((len(metrics_matches) / 4) * 100))

    # ─────────────────────────────────────────────
    # 5. STRUCTURE SCORE + SECTION ORDER BONUS
    # ─────────────────────────────────────────────
    section_map = {
        'summary':     ['summary', 'objective', 'profile', 'about'],
        'experience':  ['experience', 'work experience', 'professional experience', 'employment'],
        'education':   ['education', 'academic', 'qualification'],
        'skills':      ['skills', 'technical skills', 'competencies'],
        'projects':    ['projects', 'project', 'portfolio'],
    }

    sections_found = []
    for key, aliases in section_map.items():
        if any(alias in lower_text for alias in aliases):
            sections_found.append(key)

    structure_score = min(100, int((len(sections_found) / 4) * 100))

    # Section order bonus
    section_order_bonus = 0
    exp_pos  = next((lower_text.find(a) for a in section_map['experience']  if a in lower_text), -1)
    edu_pos  = next((lower_text.find(a) for a in section_map['education']   if a in lower_text), -1)
    sum_pos  = next((lower_text.find(a) for a in section_map['summary']     if a in lower_text), -1)

    if exp_pos != -1 and edu_pos != -1 and exp_pos < edu_pos:
        section_order_bonus += 5   # Experience before Education ✓
    if 'projects' in sections_found:
        section_order_bonus += 5   # Projects section present ✓
    if sum_pos != -1 and sum_pos < 500:
        section_order_bonus += 3   # Summary near top of resume ✓

    structure_score = min(100, structure_score + section_order_bonus)

    # ─────────────────────────────────────────────
    # 6. EDUCATION SCORE
    # ─────────────────────────────────────────────
    edu_found = [e for e in edu_keywords if e in lower_text]
    education_score = min(100, int((len(edu_found) / 3) * 100))

    # ─────────────────────────────────────────────
    # 7. SOFT SKILLS SCORE
    # ─────────────────────────────────────────────
    soft_found = [s for s in soft_skills if s in lower_text]
    soft_score = min(100, int((len(soft_found) / 5) * 100))

    # ─────────────────────────────────────────────
    # 8. READABILITY SCORE
    # ─────────────────────────────────────────────
    # Bullet point check
    has_bullets = bool(re.search(r'[\-•●◦▪▸]', text))

    # Average sentence length (words per sentence — shorter is better for ATS)
    sentences = re.split(r'[.!?]+', text)
    sentences = [s.strip() for s in sentences if len(s.strip()) > 10]
    avg_sent_len = (sum(len(s.split()) for s in sentences) / len(sentences)) if sentences else 0

    # Long paragraph penalty: paragraphs > 60 words
    paragraphs = [p.strip() for p in text.split('\n\n') if p.strip()]
    long_para_count = sum(1 for p in paragraphs if len(p.split()) > 60)

    readability_score = 60  # base
    if has_bullets:                    readability_score += 20
    if 0 < avg_sent_len <= 20:         readability_score += 20
    elif 20 < avg_sent_len <= 30:      readability_score += 10
    # Penalize long paragraphs
    readability_score = max(10, readability_score - long_para_count * 5)
    readability_score = min(100, readability_score)

    # ─────────────────────────────────────────────
    # 9. CERTIFICATIONS SCORE
    # ─────────────────────────────────────────────
    certs_found = [c for c in certification_keywords if c in lower_text]
    cert_score = min(100, int((len(certs_found) / 2) * 100))

    # ─────────────────────────────────────────────
    # 10. PORTFOLIO SCORE (standalone category)
    # ─────────────────────────────────────────────
    portfolio_score = min(100, len(portfolio_found) * 50)

    # ─────────────────────────────────────────────
    # OVERALL WEIGHTED SCORE
    # Weights sum = 1.0
    # ─────────────────────────────────────────────
    overall = int(
        contact_score    * 0.08 +
        tech_score       * 0.22 +
        verb_score       * 0.12 +
        metrics_score    * 0.15 +
        structure_score  * 0.13 +
        education_score  * 0.08 +
        soft_score       * 0.08 +
        readability_score* 0.07 +
        cert_score       * 0.04 +
        portfolio_score  * 0.03
    )
    overall = max(0, min(100, overall))

    # ─────────────────────────────────────────────
    # STRENGTHS
    # ─────────────────────────────────────────────
    strengths = []

    if len(tech_found) >= 8:
        strengths.append(
            f"Excellent technical depth — {len(tech_found)} keywords matched including "
            f"{', '.join(tech_found[:6])} and more."
        )
    elif len(tech_found) >= 4:
        strengths.append(
            f"Good technical keyword coverage: {', '.join(tech_found[:5])}."
        )

    if len(verbs_found) >= 6:
        strengths.append(
            f"Strong use of action verbs ({len(verbs_found)} found), demonstrating impact-driven writing."
        )

    if len(metrics_matches) >= 3:
        strengths.append(
            f"Great quantification — {len(metrics_matches)} measurable results detected (%, $, multipliers)."
        )
    elif len(metrics_matches) > 0:
        strengths.append(f"Includes {len(metrics_matches)} quantifiable metric(s) — ATS-friendly.")

    if len(sections_found) >= 4:
        strengths.append(f"Well-structured resume with all key sections: {', '.join(sections_found)}.")

    if has_bullets:
        strengths.append("Bullet points detected — great for ATS parsing and recruiter readability.")

    if portfolio_found:
        strengths.append(
            f"Portfolio/GitHub presence detected ({', '.join(portfolio_found[:2])}) — boosts credibility."
        )

    if certs_found:
        strengths.append(f"Certifications detected ({', '.join(certs_found[:3])}) — adds trust signals.")

    if soft_found:
        strengths.append(
            f"Soft skills highlighted ({', '.join(soft_found[:4])}) — valuable for culture-fit assessments."
        )

    # ─────────────────────────────────────────────
    # WEAKNESSES
    # ─────────────────────────────────────────────
    weaknesses = []

    if len(tech_found) < 5:
        weaknesses.append(
            f"Low technical keyword count ({len(tech_found)}) — most ATS systems expect 8–15 relevant "
            f"skills to pass initial filtering."
        )
    if len(verbs_found) < 4:
        weaknesses.append(
            "Action verbs are underused — passive language ('responsible for', 'involved in') reduces "
            "ATS match scores."
        )
    if len(metrics_matches) == 0:
        weaknesses.append(
            "No numeric data or percentages found — ATS and recruiters strongly prefer quantified "
            "achievements like 'reduced load time by 40%'."
        )
    if not has_linkedin:
        weaknesses.append(
            "LinkedIn URL not detected — add it to the contact section (e.g., linkedin.com/in/yourname)."
        )
    if not has_bullets:
        weaknesses.append(
            "No bullet points detected — use '•' or '-' to structure experience descriptions for better "
            "ATS parsing."
        )
    if not portfolio_found:
        weaknesses.append(
            "No portfolio or GitHub link found — adding github.com/yourusername can significantly "
            "boost technical credibility."
        )
    if not certs_found:
        weaknesses.append(
            "No certifications detected — even listing in-progress certifications (e.g., AWS Certified "
            "Developer, Google Cloud Associate) can improve ranking."
        )
    if avg_sent_len > 30:
        weaknesses.append(
            f"Sentences are too long on average ({avg_sent_len:.0f} words) — ATS parsers prefer concise, "
            f"scannable bullet points under 20 words."
        )

    # ─────────────────────────────────────────────
    # ACTIONABLE SUGGESTIONS
    # ─────────────────────────────────────────────
    suggestions = []

    if len(tech_found) < 8:
        missing_examples = [
            k for k in ['react', 'node', 'postgresql', 'docker', 'aws', 'typescript', 'redis', 'kubernetes']
            if k not in tech_found
        ][:4]
        if missing_examples:
            suggestions.append(
                f"Add missing in-demand skills to your Skills section — for example: "
                f"{', '.join(t.title() for t in missing_examples)}. Match these to the job description."
            )

    if len(metrics_matches) < 3:
        suggestions.append(
            "Quantify your impact with numbers. Example rewrites:\n"
            "  • 'Worked on API optimization' → 'Optimized REST API response time by 35%, serving 50K+ requests/day'\n"
            "  • 'Built a dashboard' → 'Built analytics dashboard reducing report generation time from 2hrs to 5min'"
        )

    if len(verbs_found) < 6:
        suggestions.append(
            "Begin each bullet point with a strong action verb. Replace weak phrases:\n"
            "  • 'Was responsible for' → 'Spearheaded'\n"
            "  • 'Helped with' → 'Collaborated on'\n"
            "  • 'Worked on' → 'Engineered' / 'Architected' / 'Optimized'"
        )

    if len(sections_found) < 4:
        missing_sections = [s for s in ['summary', 'experience', 'skills', 'projects', 'education'] if s not in sections_found]
        suggestions.append(
            f"Add missing sections with clear headers: {', '.join(s.title() for s in missing_sections)}. "
            f"ATS systems use these headers to categorize your content."
        )

    if not has_bullets:
        suggestions.append(
            "Reformat your experience descriptions as bullet points starting with action verbs. "
            "This improves ATS parsing accuracy by up to 25% and is easier for recruiters to scan."
        )

    if not portfolio_found:
        suggestions.append(
            "Add your GitHub profile (e.g., github.com/yourusername) to the contact section or "
            "next to project names. Recruiters actively check GitHub for technical candidates."
        )

    if not certs_found:
        suggestions.append(
            "List any relevant certifications in a 'Certifications' section — e.g., "
            "'AWS Certified Solutions Architect', 'Google Cloud Professional Data Engineer', "
            "'Meta Front-End Developer Certificate'. Even pursuing certifications is worth mentioning."
        )

    if word_count < 300:
        suggestions.append(
            f"Your resume is quite brief ({word_count} words). Aim for 400–700 words to give ATS "
            f"enough content to evaluate. Expand your project descriptions and skills."
        )
    elif word_count > 900:
        suggestions.append(
            f"At {word_count} words, your resume may be too long. Condense to 1–2 pages by removing "
            f"outdated roles or redundant details. ATS systems can de-rank overly lengthy resumes."
        )

    if not soft_found:
        suggestions.append(
            "Incorporate soft skills naturally within experience bullets — e.g., 'Led cross-functional "
            "team of 5 engineers', 'Mentored 3 junior developers', 'Presented roadmap to C-suite stakeholders'."
        )

    # ─────────────────────────────────────────────
    # FALLBACKS
    # ─────────────────────────────────────────────
    if not strengths:
        strengths = ["Resume submitted successfully for analysis. Basic structure detected."]
    if not weaknesses:
        weaknesses = ["Excellent resume! No major structural issues detected. Fine-tune for specific job descriptions."]
    if not suggestions:
        suggestions = [
            "Your resume is well-optimized! For further improvements, tailor your Skills section to "
            "mirror exact keywords from each job posting you apply to."
        ]

    # ─────────────────────────────────────────────
    # RETURN RESULT
    # ─────────────────────────────────────────────
    return {
        "overall": overall,
        "categories": {
            "contact":       {"score": contact_score,     "label": "Contact Info",         "icon": "mail"},
            "technical":     {"score": tech_score,        "label": "Technical Keywords",   "icon": "code"},
            "actionVerbs":   {"score": verb_score,        "label": "Action Verbs",         "icon": "trending"},
            "metrics":       {"score": metrics_score,     "label": "Quantifiable Impact",  "icon": "chart"},
            "structure":     {"score": structure_score,   "label": "Resume Structure",     "icon": "briefcase"},
            "education":     {"score": education_score,   "label": "Education",            "icon": "education"},
            "softSkills":    {"score": soft_score,        "label": "Soft Skills",          "icon": "users"},
            "readability":   {"score": readability_score, "label": "Readability",          "icon": "eye"},
            "certifications":{"score": cert_score,        "label": "Certifications",       "icon": "award"},
            "portfolio":     {"score": portfolio_score,   "label": "Portfolio / GitHub",   "icon": "link"},
        },
        "strengths":  strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions,
        "stats": {
            "wordCount":    word_count,
            "techKeywords": len(tech_found),
            "actionVerbs":  len(verbs_found),
            "metrics":      len(metrics_matches),
            "sections":     len(sections_found),
            "softSkills":   len(soft_found),
            "certifications": len(certs_found),
            "portfolioLinks": len(portfolio_found),
        }
    }


async def analyze_resume_with_ai(text: str):
    if not api_key or api_key == "sk-placeholder" or not api_key.startswith("sk-"):
        return analyze_resume_locally(text)

    prompt = f"""
    Analyze the following resume text for ATS (Applicant Tracking System) compatibility.
    
    Return a valid JSON object ONLY. Do not include markdown code block formatting or anything else.
    JSON schema:
    {{
        "overall": number (0-100),
        "categories": {{
            "contact":        {{"score": number, "label": "Contact Info",         "icon": "mail"}},
            "technical":      {{"score": number, "label": "Technical Keywords",   "icon": "code"}},
            "actionVerbs":    {{"score": number, "label": "Action Verbs",         "icon": "trending"}},
            "metrics":        {{"score": number, "label": "Quantifiable Impact",  "icon": "chart"}},
            "structure":      {{"score": number, "label": "Resume Structure",     "icon": "briefcase"}},
            "education":      {{"score": number, "label": "Education",            "icon": "education"}},
            "softSkills":     {{"score": number, "label": "Soft Skills",          "icon": "users"}},
            "readability":    {{"score": number, "label": "Readability",          "icon": "eye"}},
            "certifications": {{"score": number, "label": "Certifications",       "icon": "award"}},
            "portfolio":      {{"score": number, "label": "Portfolio / GitHub",   "icon": "link"}}
        }},
        "strengths":   [string],
        "weaknesses":  [string],
        "suggestions": [string],
        "stats": {{
            "wordCount":       number,
            "techKeywords":    number,
            "actionVerbs":     number,
            "metrics":         number,
            "sections":        number,
            "softSkills":      number,
            "certifications":  number,
            "portfolioLinks":  number
        }}
    }}
    
    Scoring weights for the overall score:
    - contact: 8%, technical: 22%, actionVerbs: 12%, metrics: 15%, structure: 13%,
      education: 8%, softSkills: 8%, readability: 7%, certifications: 4%, portfolio: 3%

    Provide highly specific, actionable suggestions with concrete rewrite examples where possible.
    Highlight exactly where and how they need to modify their resume to boost ATS performance.
    
    Resume Text:
    {text}
    """

    try:
        response = await client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a professional ATS resume analyzer. Output strictly valid JSON "
                        "matching the specified schema with 10 scoring categories. Provide specific, "
                        "actionable suggestions with rewrite examples."
                    )
                },
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        result = json.loads(response.choices[0].message.content)
        return result
    except Exception as e:
        print(f"Error calling OpenAI API: {e}. Falling back to local analysis.")
        return analyze_resume_locally(text)
