# AgriGPT: AI & IoT Multimodal Platform for Smarter, Safer Farming

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-3D%20Lab-black?logo=threedotjs)](https://threejs.org)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

AgriGPT is a full-stack, three-tier farm intelligence platform built to bridge the gap in real-time, field-edge decision support for small and medium farms[span_0](start_span)[span_0](end_span)[span_1](start_span)[span_1](end_span)[span_2](start_span)[span_2](end_span). It combines farm management records, soil tests, weather forecasting, crop economics, and an AI assistant with late-fusion multimodal diagnostics, edge hazard detection, a 3D pest-growth simulation lab, and an explainable governance framework[span_3](start_span)[span_3](end_span)[span_4](start_span)[span_4](end_span).

---

## Key Modules & Features

- **Explainable Agronomic Engines:**
  - **Crop Suitability Scoring:** Deterministic 0–100 suitability score based on soil type, pH, temperature, rainfall, N-P-K, and moisture that automatically renormalizes over missing data[span_5](start_span)[span_5](end_span)[span_6](start_span)[span_6](end_span).
  - **Fertilizer Advisory:** Classifies Nitrogen (N), Phosphorus (P), and Potassium (K) into Deficient, Adequate, or Surplus bands with clear overuse warnings[span_7](start_span)[span_7](end_span)[span_8](start_span)[span_8](end_span).
  - **Irrigation Guidance:** Evaluates current volumetric soil moisture against ideal crop ranges and recent rainfall levels to provide tiered urgency guidance (Low, Medium, High)[span_9](start_span)[span_9](end_span)[span_10](start_span)[span_10](end_span).
  - **Farm Economics:** Calculates per-hectare cultivation costs, yield estimates, expected revenue, and net profit margins across crops[span_11](start_span)[span_11](end_span)[span_12](start_span)[span_12](end_span).
- **Multimodal AI Diagnosis Studio:**
  - Employs a late-fusion pipeline that integrates up to 4 modalities: symptom descriptions in English, Hindi, and Punjabi (text or voice), leaf photograph color analysis, live IoT microclimate telemetry (temperature, humidity, moisture, VOC), and simulated 3D field state[span_13](start_span)[span_13](end_span)[span_14](start_span)[span_14](end_span)[span_15](start_span)[span_15](end_span).
- **3D Agricultural Learning Lab:**
  - Browser-based Three.js interactive simulation modeling logistic crop growth, foliage damage, and pest-swarm behavior (aphids, caterpillars, locusts) with adjustable severity, simulation speeds, spray interventions, and webcam hand gestures[span_16](start_span)[span_16](end_span)[span_17](start_span)[span_17](end_span)[span_18](start_span)[span_18](end_span).
- **Edge CV Hazard Radar:**
  - Edge computer vision simulator (YOLOv8n / ESP32-CAM) detecting venomous snakes (e.g., Russell's viper), toxic chemical plumes, and machinery PTO hazards with immediate safety protocols, buzzer alerts, simulated GSM notifications, and one-tap emergency calling[span_19](start_span)[span_19](end_span)[span_20](start_span)[span_20](end_span)[span_21](start_span)[span_21](end_span).
- **Variable-Rate Precision Spraying:**
  - Displays a $4\times4$ zone grid categorizing areas into healthy, stress, or critical, providing targeted dosage recommendations (L/ha) compared to blanket application to cut chemical inputs[span_22](start_span)[span_22](end_span)[span_23](start_span)[span_23](end_span)[span_24](start_span)[span_24](end_span).
- **Trust & Governance:**
  - Implements a six-principle governance model covering fact-grounded retrieval, confidence and uncertainty reporting, human-in-the-loop overrides, chemical safety thresholds, soil-health protection, and auditable logs[span_25](start_span)[span_25](end_span)[span_26](start_span)[span_26](end_span).

---

## Architecture Overview

```text
├── Presentation Tier (Frontend)
│   ├── React 18, TypeScript, Vite, Tailwind CSS[span_27](start_span)[span_27](end_span)[span_28](start_span)[span_28](end_span)
│   ├── State: Zustand (Auth) & TanStack React Query (Server caching)[span_29](start_span)[span_29](end_span)[span_30](start_span)[span_30](end_span)
│   └── 3D Simulation: Three.js[span_31](start_span)[span_31](end_span)[span_32](start_span)[span_32](end_span)
│
├── Application Tier (Backend)
│   ├── FastAPI 0.115, Python 3.11+ (Asynchronous REST API)[span_33](start_span)[span_33](end_span)[span_34](start_span)[span_34](end_span)
│   ├── Security: JWT (HS256) and bcrypt password hashing[span_35](start_span)[span_35](end_span)[span_36](start_span)[span_36](end_span)
│   ├── Computer Vision: Pillow for leaf tissue necrosis analysis[span_37](start_span)[span_37](end_span)[span_38](start_span)[span_38](end_span)
│   └── External Integrations: Open-Meteo API and OpenAI-compatible LLM endpoints[span_39](start_span)[span_39](end_span)[span_40](start_span)[span_40](end_span)
│
└── Data Tier (Database)
    ├── SQLAlchemy 2.0 (Async ORM) & Alembic schema migrations[span_41](start_span)[span_41](end_span)[span_42](start_span)[span_42](end_span)
    ├── PostgreSQL (Production) / SQLite (Local development & testing)[span_43](start_span)[span_43](end_span)[span_44](start_span)[span_44](end_span)[span_45](start_span)[span_45](end_span)
    └── Relational Schema: 9 core tables (users, farms, soil_records, crops, crop_diseases, crop_economics, farm_resources, reports, assistant_messages)[span_46](start_span)[span_46](end_span)[span_47](start_span)[span_47](end_span)

cd backend
python -m venv venv
source venv/bin/activate
npm run dev

# Windows:
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

cd AgriGPT_frontend/frontend
npm install
npm run dev
pytest -v

