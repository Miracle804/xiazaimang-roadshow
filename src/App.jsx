import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  ChevronRight,
  DatabaseZap,
  FileCheck2,
  Fingerprint,
  GitBranch,
  Keyboard,
  LockKeyhole,
  MessagesSquare,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  Workflow,
  Zap,
} from "lucide-react";
import mascotHero from "./assets/mascot-hero.png";
import workflowVisual from "./assets/workflow-visual.png";
import securityVisual from "./assets/security-visual.png";
import orgNetworkVisual from "./assets/org-network-visual.png";
import dataScreen1 from "./assets/data-screen-1.jpg";
import dataScreen2 from "./assets/data-screen-2.jpg";

const slides = [
  { id: "hero", title: "虾在忙", nav: "定位" },
  { id: "scene", title: "真实场景", nav: "痛点" },
  { id: "loop", title: "闭环架构", nav: "闭环" },
  { id: "safe", title: "可控执行", nav: "安全" },
  { id: "scale", title: "价值扩展", nav: "价值" },
];

const flowNodes = [
  { icon: MessagesSquare, label: "群消息", text: "自然入口" },
  { icon: Radar, label: "识别", text: "提取意图" },
  { icon: BrainCircuit, label: "FAQ", text: "秒级回答" },
  { icon: TicketCheck, label: "工单", text: "看板同步" },
  { icon: ShieldCheck, label: "审批", text: "公开门控" },
  { icon: DatabaseZap, label: "API", text: "业务执行" },
  { icon: Network, label: "知识", text: "持续沉淀" },
];

const metrics = [
  ["134", "工单样本", "真实支持流量"],
  ["50", "提问角色", "跨团队需求"],
  ["70", "已解决", "有经验可复用"],
  ["60", "解决方案", "可转 FAQ 资产"],
];

const valueCards = [
  ["业务", "少等人", "问题有人接，状态可见"],
  ["技术", "少打断", "重复问题自动承接"],
  ["管理", "可追踪", "看板沉淀全过程"],
  ["组织", "会成长", "经验变成团队知识"],
];

function useDeckNav(total) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKey = (event) => {
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        setIndex((value) => Math.min(value + 1, total - 1));
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        setIndex((value) => Math.max(value - 1, 0));
      }
      if (event.key === "Home") setIndex(0);
      if (event.key === "End") setIndex(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return [index, setIndex];
}

function Ambient() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        delay: `${(i % 9) * -1.3}s`,
        duration: `${9 + (i % 7)}s`,
      })),
    [],
  );

  return (
    <div className="ambient" aria-hidden="true">
      <div className="grid-floor" />
      <div className="scanline" />
      {particles.map((dot) => (
        <span
          className="particle"
          key={dot.id}
          style={{ left: dot.left, animationDelay: dot.delay, animationDuration: dot.duration }}
        />
      ))}
    </div>
  );
}

function Shell({ current, setCurrent, children }) {
  return (
    <main className="deck-shell">
      <Ambient />
      <div className="progress" style={{ width: `${((current + 1) / slides.length) * 100}%` }} />
      <aside className="side-nav">
        {slides.map((slide, idx) => (
          <button
            className={idx === current ? "active" : ""}
            key={slide.id}
            onClick={() => setCurrent(idx)}
            type="button"
          >
            <span>{String(idx + 1).padStart(2, "0")}</span>
            {slide.nav}
          </button>
        ))}
      </aside>
      <section className="stage">
        <div className="deck-viewport">{children}</div>
      </section>
      <div className="controls">
        <button type="button" onClick={() => setCurrent(Math.max(current - 1, 0))} aria-label="上一页">
          <ArrowLeft size={18} />
        </button>
        <div className="keyboard-hint">
          <Keyboard size={15} />
          左右键翻页
        </div>
        <button type="button" onClick={() => setCurrent(Math.min(current + 1, slides.length - 1))} aria-label="下一页">
          <ArrowRight size={18} />
        </button>
      </div>
    </main>
  );
}

function SlideFrame({ eyebrow, page, children, footer }) {
  return (
    <article className="slide-frame">
      <header className="slide-top">
        <div className="eyebrow">
          <Sparkles size={16} />
          {eyebrow}
        </div>
        <div className="page">{page} / 05</div>
      </header>
      <div className="slide-body">{children}</div>
      <footer className="slide-footer">{footer}</footer>
    </article>
  );
}

function HeroSlide() {
  return (
    <SlideFrame eyebrow="AI Workflow Agent" page="01" footer="飞书群 → 工单 → 审批 → API → 知识库">
      <div className="hero-slide">
        <div className="hero-copy">
          <div className="title-pill">
            <Bot size={18} />
            工作群里的可控执行型 AI Agent
          </div>
          <h1>虾在忙</h1>
          <p>把一句群消息自动流转成 FAQ、工单、审批、业务执行和知识沉淀。</p>
          <div className="hero-actions">
            {[
              ["识别", "从噪声里抓取工作信号"],
              ["分流", "FAQ / 工单 / API 三路处理"],
              ["审批", "高风险操作公开门控"],
              ["沉淀", "解决一次，复用一次"],
            ].map(([title, text]) => (
              <div className="action-chip" key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image">
            <img src={mascotHero} alt="虾在忙主形象" />
          </div>
          <div className="floating-card card-a">
            <MessagesSquare size={18} />
            群消息识别中
          </div>
          <div className="floating-card card-b">
            <ShieldCheck size={18} />
            审批状态已同步
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function SceneSlide() {
  const messages = [
    "学生小程序看不到课程，帮忙排查？",
    "新人账号需要开通排课权限。",
    "这个订单销售说已经录了，但后台领取不到。",
    "误排课节需要删除，课节 ID 在截图里。",
    "老师反馈回放只显示 22 秒。",
    "帮忙把导师从 A 改成 B，今天要上课。",
  ];

  return (
    <SlideFrame eyebrow="Real Support Stream" page="02" footer="痛点不是没人处理，而是群聊本身接不住流程">
      <div className="scene-slide">
        <div>
          <h2>问题都在群里，但群聊接不住流程</h2>
          <p className="slide-lead">真实工作群里，求助、确认、闲聊和后台操作请求混在一起。虾在忙负责识别真正需要推进的工作信号。</p>
          <div className="message-river">
            <div className="beam" />
            <div className="message-track">
              {[...messages, ...messages].map((message, idx) => (
                <div className={idx % 3 === 1 ? "message hot" : "message"} key={`${message}-${idx}`}>
                  <MessagesSquare size={16} />
                  {message}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="metric-wall">
          {metrics.map(([num, label, desc]) => (
            <div className="metric-card" key={label}>
              <strong>{num}</strong>
              <span>{label}</span>
              <p>{desc}</p>
            </div>
          ))}
          <div className="screen-stack">
            <img src={dataScreen1} alt="业务系统截图 1" />
            <img src={dataScreen2} alt="业务系统截图 2" />
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function LoopSlide() {
  return (
    <SlideFrame eyebrow="Closed Loop Engine" page="03" footer="从“回复一个答案”升级为“推进一条流程”">
      <div className="loop-slide">
        <div className="visual-backdrop">
          <img src={workflowVisual} alt="虾在忙工作流视觉" />
          <div className="visual-shade" />
        </div>
        <div className="loop-copy">
          <h2>一句群消息，流转成一个完整闭环</h2>
          <p className="slide-lead">它不是只会聊天，而是把非结构化消息变成可追踪、可审批、可执行、可沉淀的工作流。</p>
        </div>
        <div className="flow-map">
          {flowNodes.map(({ icon: Icon, label, text }, idx) => (
            <div className="flow-node" key={label} style={{ "--delay": `${idx * 0.18}s` }}>
              <Icon size={24} />
              <strong>{label}</strong>
              <span>{text}</span>
              {idx < flowNodes.length - 1 && <ChevronRight className="flow-arrow" size={18} />}
            </div>
          ))}
        </div>
        <div className="module-strip">
          {["OpenClaw Gateway", "work-ticket", "approval-gate", "api-operations", "http-json"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function SafeSlide() {
  return (
    <SlideFrame eyebrow="Controlled Execution" page="04" footer="企业 AI 的关键不是无限自动，而是在安全边界内自动">
      <div className="safe-slide">
        <div className="safe-visual">
          <img src={securityVisual} alt="虾在忙审批安全视觉" />
        </div>
        <div className="safe-overlay">
          <h2>自动化，但不失控</h2>
          <div className="safe-columns">
            <div className="safe-list direct">
              <h3>可直接处理</h3>
              {["FAQ 回答", "创建工单", "查询信息", "同步看板"].map((item) => (
                <div key={item}>
                  <BadgeCheck size={18} />
                  {item}
                </div>
              ))}
            </div>
            <div className="approval-core">
              <LockKeyhole size={48} />
              <strong>审批安全舱</strong>
              <div className="approval-track">
                {["REQUEST", "VERIFY", "APPROVE", "EXECUTE"].map((step) => (
                  <span key={step}>{step}</span>
                ))}
              </div>
            </div>
            <div className="safe-list approval">
              <h3>必须审批</h3>
              {["权限开通", "订单分配", "变更导师", "课节 / 课时"].map((item) => (
                <div key={item}>
                  <Fingerprint size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function ScaleSlide() {
  return (
    <SlideFrame eyebrow="Scale The Agent" page="05" footer="从技术支持群开始，扩展到所有高频支持场景">
      <div className="scale-slide">
        <div className="scale-copy">
          <h2>让每个支持群都有一个 AI 一线协作员</h2>
          <p className="slide-lead">虾在忙的终点不是多一个群机器人，而是一套可复制的内部 AI 工作流模板。</p>
          <div className="value-grid">
            {valueCards.map(([role, title, text]) => (
              <div className="value-card" key={role}>
                <span>{role}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="roadmap">
            {[
              ["NOW", "核心闭环"],
              ["01", "打磨高频场景"],
              ["02", "复制更多支持群"],
              ["03", "形成协作中枢"],
            ].map(([phase, title]) => (
              <div className="road-step" key={phase}>
                <span>{phase}</span>
                <strong>{title}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="final-card">
          <img src={orgNetworkVisual} alt="AI 工作流连接多个支持团队" />
          <div>
            <ChartNoAxesCombined size={22} />
            从一个群的闭环，复制成多个团队共享的 AI 协作中枢。
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

export default function App() {
  const [current, setCurrent] = useDeckNav(slides.length);
  const offset = current * (100 / slides.length);
  const trackStyle = {
    width: `${slides.length * 100}%`,
    transform: `translateX(-${offset}%)`,
  };
  const slideStyle = {
    width: `${100 / slides.length}%`,
    minWidth: `${100 / slides.length}%`,
  };

  return (
    <Shell current={current} setCurrent={setCurrent}>
      <div className="slides-track" style={trackStyle}>
        <div className="slide-cell" style={slideStyle}>
          <HeroSlide />
        </div>
        <div className="slide-cell" style={slideStyle}>
          <SceneSlide />
        </div>
        <div className="slide-cell" style={slideStyle}>
          <LoopSlide />
        </div>
        <div className="slide-cell" style={slideStyle}>
          <SafeSlide />
        </div>
        <div className="slide-cell" style={slideStyle}>
          <ScaleSlide />
        </div>
      </div>
    </Shell>
  );
}
