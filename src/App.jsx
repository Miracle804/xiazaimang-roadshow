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
  MonitorPlay,
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
import demoVideo from "./assets/xiazaimang-demo.mp4";

const slides = [
  { id: "hero", title: "虾在忙", nav: "定位" },
  { id: "demo", title: "产品演示", nav: "演示" },
  { id: "loop", title: "OpenClaw 架构", nav: "架构" },
  { id: "safe", title: "可控执行", nav: "安全" },
  { id: "scale", title: "价值扩展", nav: "价值" },
];

const totalSlides = String(slides.length).padStart(2, "0");

const flowNodes = [
  { icon: MessagesSquare, label: "飞书群", text: "业务入口" },
  { icon: Workflow, label: "OpenClaw", text: "编排中枢" },
  { icon: Radar, label: "意图识别", text: "提取问题" },
  { icon: TicketCheck, label: "工单", text: "同步处理" },
  { icon: ShieldCheck, label: "审批", text: "风险门控" },
  { icon: DatabaseZap, label: "业务系统", text: "API 执行" },
  { icon: Network, label: "知识库", text: "经验沉淀" },
];

const positioningCards = [
  { icon: Workflow, title: "OpenClaw", text: "负责 Agent 编排与工具调用" },
  { icon: MessagesSquare, title: "飞书群", text: "承接自然语言支持请求" },
  { icon: TicketCheck, title: "工单", text: "把问题转成可追踪任务" },
  { icon: BrainCircuit, title: "知识库", text: "沉淀可复用处理经验" },
];

const metrics = [
  ["16天", "持续运行", "4.22 上线至今"],
  ["134", "工单处理", "真实支持流量"],
  ["50+", "服务用户", "跨团队覆盖"],
  ["48次", "自动操作", "API 调用执行"],
];

const scenarioTags = [
  ["课程/课节", "排课异常、课节删除、课时核对"],
  ["订单/价格", "订单领取、价格异常、优惠调整"],
  ["账号/权限", "新人开通、角色权限、后台访问"],
  ["小程序/回放", "页面不可见、回放异常、数据校验"],
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
        <div className="page">{page} / {totalSlides}</div>
      </header>
      <div className="slide-body">{children}</div>
      <footer className="slide-footer">{footer}</footer>
    </article>
  );
}

function HeroSlide() {
  const messages = [
    "学生小程序看不到课程，帮忙排查？",
    "新人账号需要开通排课权限。",
    "订单已经录入，但后台领取不到。",
    "误排课节需要删除，课节 ID 在截图里。",
    "老师反馈回放只显示 22 秒。",
    "课单价不一致，需要核对并回写结果。",
  ];

  return (
    <SlideFrame eyebrow="OpenClaw AI Workflow Agent" page="01" footer="OpenClaw 编排层 + 飞书群入口 + 工单/审批/API/知识库">
      <div className="hero-slide">
        <div className="hero-copy">
          <div className="title-pill">
            <Bot size={18} />
            基于 OpenClaw 的飞书群支持 Agent
          </div>
          <h1>虾在忙</h1>
          <p>面向运营、师资中台小程序问题反馈群，将课程、订单、权限、课节等支持请求自动识别、转工单、回写状态并沉淀知识。</p>
          <div className="business-strip">
            {scenarioTags.map(([title, text]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
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
        <div className="hero-visual">
          <div className="hero-image">
            <img src={mascotHero} alt="虾在忙主形象" />
          </div>
          <div className="metric-wall">
            {metrics.map(([num, label, desc]) => (
              <div className="metric-card" key={label}>
                <strong>{num}</strong>
                <span>{label}</span>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function DemoSlide() {
  const demoSteps = [
    ["01", "群聊提问", "业务问题在支持群中自然产生"],
    ["02", "工单承接", "虾在忙识别问题并关联处理工单"],
    ["03", "结果回写", "处理状态同步回群聊，留下可追踪记录"],
  ];

  return (
    <SlideFrame eyebrow="Recorded Product Flow" page="02" footer="真实支持群中的问题承接、工单同步与处理结果回写">
      <div className="demo-slide">
        <div className="demo-player">
          <div className="video-chrome">
            <span />
            <span />
            <span />
            <strong>xiazaimang-demo.mp4</strong>
            <em>53s</em>
          </div>
          <div className="video-stage">
            <video src={demoVideo} autoPlay muted loop playsInline controls preload="metadata" />
          </div>
        </div>
        <div className="demo-copy">
          <div className="title-pill">
            <MonitorPlay size={18} />
            支持群处理链路
          </div>
          <h2>从群聊提问到工单状态回写</h2>
          <p className="slide-lead">录屏展示虾在忙在支持群中的实际运行过程：将非结构化群消息转为可跟进的处理链路，并把进展同步回到原会话。</p>
          <div className="demo-steps">
            {demoSteps.map(([num, title, text]) => (
              <div className="demo-step" key={num}>
                <span>{num}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function LoopSlide() {
  return (
    <SlideFrame eyebrow="OpenClaw Workflow Engine" page="03" footer="OpenClaw 负责连接入口、工具与业务系统；虾在忙负责具体场景策略">
      <div className="loop-slide">
        <div className="visual-backdrop">
          <img src={workflowVisual} alt="虾在忙工作流视觉" />
          <div className="visual-shade" />
        </div>
        <div className="loop-copy">
          <h2>OpenClaw 编排群聊工作流</h2>
          <p className="slide-lead">将群聊消息编排为可追踪的工作流闭环</p>
        </div>
        <div className="openclaw-band">
          <div className="openclaw-mark">
            <Workflow size={22} />
            <strong>OpenClaw Framework</strong>
            <span>Gateway / Agent / Tool Nodes</span>
          </div>
          <p>框架层统一承接消息入口、工具调用和执行记录；业务层定义问题分类、工单规则、审批边界和回写策略。</p>
        </div>
        <div className="flow-map">
          {flowNodes.map(({ icon: Icon, label, text }, idx) => (
            <div className={label === "OpenClaw" ? "flow-node core" : "flow-node"} key={label} style={{ "--delay": `${idx * 0.18}s` }}>
              <Icon size={24} />
              <strong>{label}</strong>
              <span>{text}</span>
              {idx < flowNodes.length - 1 && <ChevronRight className="flow-arrow" size={18} />}
            </div>
          ))}
        </div>
        <div className="module-strip">
          {["OpenClaw Gateway", "Agent Workflow", "Tool Nodes", "Approval Gate", "Business API / FAQ"].map((item) => (
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
        <div className="scale-bg">
          <img src={orgNetworkVisual} alt="AI 工作流连接多个支持团队" />
          <div className="scale-bg-shade" />
        </div>
        <div className="scale-content">
          <div className="scale-header">
            <h2>让每个支持群都有一个<br />AI 一线协作员</h2>
            <p className="slide-lead">虾在忙的终点不是多一个群机器人，而是一套可复制的内部 AI 工作流模板。</p>
          </div>
          <div className="value-grid">
            {valueCards.map(([role, title, text]) => (
              <div className="value-card" key={role}>
                <span>{role}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="scale-bottom">
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
            <div className="scale-closing">
              <ChartNoAxesCombined size={20} />
              <span>从一个群的闭环，复制成多个团队共享的 AI 协作中枢。</span>
            </div>
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
          <DemoSlide />
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
