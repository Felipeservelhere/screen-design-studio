import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Plus,
  Users,
  UserRound,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Settings,
  FilePlus2,
  FileText,
  DollarSign,
  CircleCheck,
  CircleX,
  Download,
  ArrowRight,
  AlertTriangle,
  ArrowUpDown,
  MoreHorizontal,
  ReceiptText,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import csEmiteLogo from "@/assets/cslogo.png.asset.json";
import csEmpLogo from "@/assets/logo-csemp.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Padaria Sol · Portal do escritório" },
      {
        name: "description",
        content:
          "Visão geral de notas fiscais emitidas, valores e status por cliente no portal do escritório.",
      },
      { property: "og:title", content: "Padaria Sol · Portal do escritório" },
      {
        property: "og:description",
        content:
          "Visão geral de notas fiscais emitidas, valores e status por cliente no portal do escritório.",
      },
    ],
  }),
  component: Index,
});

type ClientTag = { label: string; tone: "muted" | "success" | "danger" };
type SystemKey = "csemite" | "csemp";

const systems: Record<SystemKey, { name: string; logo: string; className: string }> = {
  csemite: { name: "CS Emite", logo: csEmiteLogo.url, className: "bg-white" },
  csemp: { name: "CSEMP", logo: csEmpLogo.url, className: "bg-white" },
};

const clients: {
  initials: string;
  name: string;
  cnpj: string;
  tag: ClientTag;
  system: SystemKey;
  note?: string;
  active?: boolean;
}[] = [
  {
    initials: "LT",
    name: "Loja Teste",
    cnpj: "99.999.999/0001-91",
    tag: { label: "Sem cobrança", tone: "muted" },
    system: "csemite",
  },
  {
    initials: "ON",
    name: "Oficina Norte Auto Center",
    cnpj: "22.333.444/0001-99",
    tag: { label: "Teste grátis • 8 dias", tone: "success" },
    note: "R$ 45,00 · vence 18/09/2026",
    system: "csemp",
  },
  {
    initials: "FC",
    name: "Farmacia Central LTDA",
    cnpj: "99.887.766/0001-55",
    tag: { label: "Teste grátis • 8 dias", tone: "success" },
    note: "R$ 60,00 · vence 18/09/2026",
    system: "csemite",
  },
  {
    initials: "PS",
    name: "Padaria Sol",
    cnpj: "44.555.666/0001-77",
    tag: { label: "Vencido há 34 dias", tone: "danger" },
    note: "R$ 60,00 · vence 07/08/2026",
    system: "csemite",
    active: true,
  },
  {
    initials: "MJ",
    name: "Mercado do Joao",
    cnpj: "11.222.333/0001-81",
    tag: { label: "Teste grátis • 8 dias", tone: "success" },
    note: "R$ 60,00 · vence 18/09/2026",
    system: "csemp",
  },
];

type Nota = {
  id: string;
  numero: string;
  serie: string;
  chave: string;
  modelo: "NFC-e" | "NF-e";
  consumidor: string;
  documento: string;
  emissao: string;
  valor: string;
  status: "Autorizada" | "Cancelada";
  protocolo: string;
  natureza: string;
  itens: { desc: string; qtd: string; valor: string }[];
};

const notas: Nota[] = [
  {
    id: "000019",
    numero: "000019",
    serie: "série 2",
    chave: "3526 0944 5556 6600 0177 6500 2000 0019 1234 5678 90",
    modelo: "NFC-e",
    consumidor: "Consumidor de Teste",
    documento: "123.456.789-00",
    emissao: "25 ago 2026 · 14:32",
    valor: "R$ 569,70",
    status: "Autorizada",
    protocolo: "135260012345678",
    natureza: "Venda de mercadoria",
    itens: [
      { desc: "Pão francês (kg)", qtd: "12", valor: "R$ 155,40" },
      { desc: "Bolo de cenoura", qtd: "6", valor: "R$ 214,30" },
      { desc: "Refrigerante 2L", qtd: "10", valor: "R$ 200,00" },
    ],
  },
  {
    id: "000018",
    numero: "000018",
    serie: "série 1",
    chave: "3526 0944 5556 6600 0177 5500 1000 0018 2345 6789 01",
    modelo: "NF-e",
    consumidor: "Consumidor de Teste",
    documento: "123.456.789-00",
    emissao: "21 ago 2026 · 09:11",
    valor: "R$ 1.382,30",
    status: "Autorizada",
    protocolo: "135260012345671",
    natureza: "Venda de mercadoria",
    itens: [
      { desc: "Farinha de trigo (sc 25kg)", qtd: "8", valor: "R$ 982,30" },
      { desc: "Açúcar refinado (sc 30kg)", qtd: "4", valor: "R$ 400,00" },
    ],
  },
  {
    id: "000017",
    numero: "000017",
    serie: "série 1",
    chave: "3526 0944 5556 6600 0177 5500 1000 0017 3456 7890 12",
    modelo: "NF-e",
    consumidor: "Consumidor de Teste",
    documento: "123.456.789-00",
    emissao: "18 ago 2026 · 16:45",
    valor: "R$ 307,50",
    status: "Cancelada",
    protocolo: "135260012345662",
    natureza: "Venda de mercadoria",
    itens: [{ desc: "Fermento biológico (cx)", qtd: "5", valor: "R$ 307,50" }],
  },
  {
    id: "000016",
    numero: "000016",
    serie: "série 2",
    chave: "3526 0944 5556 6600 0177 6500 2000 0016 4567 8901 23",
    modelo: "NFC-e",
    consumidor: "Consumidor de Teste",
    documento: "123.456.789-00",
    emissao: "14 ago 2026 · 11:02",
    valor: "R$ 385,60",
    status: "Autorizada",
    protocolo: "135260012345653",
    natureza: "Venda de mercadoria",
    itens: [
      { desc: "Sonho de creme", qtd: "24", valor: "R$ 185,60" },
      { desc: "Café coado 300ml", qtd: "40", valor: "R$ 200,00" },
    ],
  },
  {
    id: "000015",
    numero: "000015",
    serie: "série 1",
    chave: "3526 0944 5556 6600 0177 5500 1000 0015 5678 9012 34",
    modelo: "NF-e",
    consumidor: "Consumidor de Teste",
    documento: "123.456.789-00",
    emissao: "11 ago 2026 · 08:20",
    valor: "R$ 434,50",
    status: "Autorizada",
    protocolo: "135260012345644",
    natureza: "Venda de mercadoria",
    itens: [{ desc: "Leite integral (cx 12un)", qtd: "10", valor: "R$ 434,50" }],
  },
];

const tagTone: Record<ClientTag["tone"], string> = {
  muted: "bg-white/10 text-sidebar-muted",
  success: "bg-success/20 text-success",
  danger: "bg-destructive/20 text-destructive",
};

function SystemBadge({ system, size = "sm" }: { system: SystemKey; size?: "sm" | "md" }) {
  const s = systems[system];
  return (
    <span
      title={s.name}
      className={`inline-flex shrink-0 items-center justify-center rounded-md ${s.className} ${
        size === "sm" ? "size-6 p-0.5" : "size-9 p-1"
      }`}
    >
      <img src={s.logo} alt={`Sistema ${s.name}`} className="size-full object-contain" />
    </span>
  );
}

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-white p-1">
          <img src={csEmiteLogo.url} alt="CS Emite" className="size-full object-contain" />
        </div>
        <div>
          <p className="text-[17px] font-extrabold leading-tight">Portal do escritório</p>
          <p className="text-[13px] text-sidebar-muted">Escritório Teste</p>
        </div>
      </div>

      <div className="px-6 pt-5">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold">Clientes</h2>
          <span className="text-base text-sidebar-muted">{clients.length}</span>
        </div>
        <div className="relative mt-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sidebar-muted" />
          <input
            placeholder="Buscar cliente ou CNPJ..."
            className="h-10 w-full rounded-lg border border-sidebar-border bg-white/5 pl-9 pr-3 text-sm text-sidebar-foreground outline-none placeholder:text-sidebar-muted focus:border-sidebar-ring/60 focus:ring-2 focus:ring-sidebar-ring/25"
          />
        </div>
      </div>

      <nav className="mt-3 min-h-0 flex-1 overflow-y-auto">
        {clients.map((c) => (
          <button
            key={c.name}
            className={`relative flex w-full gap-3 border-b border-sidebar-border/60 px-6 py-4 text-left transition-colors ${
              c.active ? "bg-success/10" : "hover:bg-sidebar-accent/60"
            }`}
          >
            {c.active && <span className="absolute inset-y-0 left-0 w-[3px] bg-success" />}
            <span
              className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${
                c.active ? "bg-success/25 text-success" : "bg-white/10 text-sidebar-muted"
              }`}
            >
              {c.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate text-[15px] font-semibold">{c.name}</span>
                <SystemBadge system={c.system} />
              </span>
              <span className="mt-0.5 block text-[13px] text-sidebar-muted">{c.cnpj}</span>
              <span
                className={`mt-2 inline-flex rounded-md px-2 py-1 text-xs font-semibold ${tagTone[c.tag.tone]}`}
              >
                {c.tag.label}
              </span>
              {c.note && (
                <span className="mt-2 block text-[13px] text-sidebar-muted">{c.note}</span>
              )}
            </span>
          </button>
        ))}
      </nav>

      <div className="shrink-0 border-t border-sidebar-border bg-sidebar p-6">
        <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-success/60 text-sm font-semibold text-success transition-colors hover:bg-success/10">
          <Plus className="size-4" /> Nova empresa
        </button>
        <button className="mt-5 flex items-center gap-3 text-[15px] text-sidebar-foreground/90 transition-colors hover:text-success">
          <Users className="size-5 text-sidebar-muted" /> Meus clientes
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-8 py-4">
      <nav className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Clientes</span>
        <span className="text-border">/</span>
        <span className="font-semibold text-foreground">Padaria Sol</span>
      </nav>
      <div className="flex items-center gap-4">
        <button className="flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium shadow-card transition-colors hover:bg-secondary">
          <UserRound className="size-4 text-muted-foreground" /> Meus dados
        </button>
        <button className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-full bg-info-soft text-[13px] font-bold text-info">
            EA
          </span>
          <span className="text-sm font-medium">Escritório Teste</span>
          <ChevronDown className="size-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}

function ClientHeader() {
  return (
    <section className="flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="flex size-14 items-center justify-center rounded-full bg-success-soft text-lg font-bold text-accent-foreground">
        PS
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-[28px] font-extrabold tracking-tight">Padaria Sol</h1>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-semibold">
            <SystemBadge system="csemite" />
            {systems.csemite.name}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-danger-soft px-3.5 py-1.5 text-sm font-bold text-destructive">
            <span className="size-2 rounded-full bg-destructive" />
            Vencido há 34 dias
          </span>
        </div>
        <p className="mt-1 text-[17px] text-muted-foreground">44.555.666/0001-77</p>
        <p className="mt-1.5 text-[15px] text-muted-foreground">
          R$ 60,00/mês · venceu 07/08/2026
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex h-12 items-center gap-2 rounded-xl border border-border px-5 text-[15px] font-semibold transition-colors hover:bg-secondary">
          <Settings className="size-4.5 text-muted-foreground" /> Configurar
        </button>
        <button className="flex h-12 items-center gap-2 rounded-xl bg-primary px-5 text-[15px] font-semibold text-primary-foreground shadow-card transition-colors hover:bg-primary/90">
          <FilePlus2 className="size-4.5" /> Emitir nota
        </button>
      </div>
    </section>
  );
}

const ranges = ["Este mês", "Mês passado", "Este ano"];

function OverviewHeader() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-[26px] font-extrabold tracking-tight">Visão geral</h2>
        <p className="mt-1 text-[15px] text-muted-foreground">
          Relatório 7 notas · pasta 20260801_20260911 · por modelo
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {ranges.map((r) => (
          <button
            key={r}
            className={`h-11 rounded-lg px-4 text-sm font-medium transition-colors ${
              r === "Este ano"
                ? "bg-success-soft text-accent-foreground"
                : "border border-border bg-card hover:bg-secondary"
            }`}
          >
            {r}
          </button>
        ))}
        <input
          type="date"
          defaultValue="2026-08-01"
          className="h-11 rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
        <span className="text-sm text-muted-foreground">até</span>
        <input
          type="date"
          defaultValue="2026-09-11"
          className="h-11 rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
      </div>
    </div>
  );
}

const stats = [
  { icon: FileText, tone: "info", value: "7", label: "notas" },
  { icon: DollarSign, tone: "success", value: "R$ 3.731,00", label: "emitidos" },
  { icon: CircleCheck, tone: "success", value: "6", label: "autorizadas" },
  { icon: CircleX, tone: "danger", value: "1", label: "cancelada" },
];

const statTone: Record<string, string> = {
  info: "bg-info-soft text-info",
  success: "bg-success-soft text-success",
  danger: "bg-danger-soft text-destructive",
};

function Stats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"
        >
          <span
            className={`flex size-12 items-center justify-center rounded-xl ${statTone[s.tone]}`}
          >
            <s.icon className="size-6" />
          </span>
          <span>
            <span className="block text-2xl font-extrabold tracking-tight">{s.value}</span>
            <span className="block text-[15px] text-muted-foreground">{s.label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

const models = [
  {
    name: "NFC-e",
    modelo: "Modelo 65",
    tone: "info",
    notas: "3",
    valor: "R$ 1.145,20",
    detail: "3 autorizadas • 0 canceladas",
  },
  {
    name: "NF-e",
    modelo: "Modelo 55",
    tone: "success",
    notas: "4",
    valor: "R$ 2.585,80",
    detail: "3 autorizadas • 1 cancelada",
  },
];

function ModelCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {models.map((m) => (
        <div
          key={m.name}
          className={`overflow-hidden rounded-2xl border border-border bg-card shadow-card ${
            m.tone === "info" ? "border-l-4 border-l-info" : "border-l-4 border-l-success"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <span
                className={`flex size-11 items-center justify-center rounded-xl ${
                  m.tone === "info"
                    ? "bg-info text-primary-foreground"
                    : "bg-success text-primary-foreground"
                }`}
              >
                <FileText className="size-5" />
              </span>
              <div>
                <p className="text-xl font-extrabold tracking-tight">
                  {m.name} <span className="font-medium text-muted-foreground">· {m.modelo}</span>
                </p>
                <p className="mt-2 text-xl font-bold">
                  {m.notas}
                  <span className="ml-2 align-baseline text-[15px] font-normal text-muted-foreground">
                    notas
                  </span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold tracking-tight">{m.valor}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border px-6 py-4">
            <button className="flex items-center gap-2 text-[15px] font-semibold text-foreground transition-colors hover:text-primary">
              Ver resumo <ArrowRight className="size-4" />
            </button>
            <button className="flex items-center gap-2 text-[15px] font-semibold text-foreground transition-colors hover:text-primary">
              <Download className="size-4" /> Baixar XMLs
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function NotaDetails({ nota, onClose }: { nota: Nota | null; onClose: () => void }) {
  return (
    <Dialog open={!!nota} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        {nota && (
          <>
            <DialogHeader>
              <DialogTitle className="flex flex-wrap items-center gap-3 text-xl">
                Nota {nota.numero}
                <span className="text-base font-normal text-muted-foreground">{nota.serie}</span>
                <span
                  className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${
                    nota.modelo === "NFC-e"
                      ? "bg-info-soft text-info"
                      : "bg-success-soft text-accent-foreground"
                  }`}
                >
                  {nota.modelo}
                </span>
                <span
                  className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-bold ${
                    nota.status === "Autorizada"
                      ? "bg-success-soft text-accent-foreground"
                      : "bg-danger-soft text-destructive"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      nota.status === "Autorizada" ? "bg-success" : "bg-destructive"
                    }`}
                  />
                  {nota.status}
                </span>
              </DialogTitle>
              <DialogDescription>
                Emitida em {nota.emissao} · {nota.natureza}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Consumidor", value: nota.consumidor },
                { label: "CPF/CNPJ", value: nota.documento },
                { label: "Valor total", value: nota.valor },
                { label: "Protocolo", value: nota.protocolo },
              ].map((f) => (
                <div key={f.label} className="rounded-xl border border-border bg-secondary/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {f.label}
                  </p>
                  <p className="mt-1 text-[15px] font-semibold">{f.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-secondary/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Chave de acesso
              </p>
              <p className="mt-1 break-all font-mono text-sm">{nota.chave}</p>
            </div>

            <div className="rounded-xl border border-border">
              <p className="border-b border-border px-4 py-3 text-sm font-bold">Itens da nota</p>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <th className="px-4 py-2 font-semibold">Descrição</th>
                    <th className="px-4 py-2 font-semibold">Qtd</th>
                    <th className="px-4 py-2 text-right font-semibold">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {nota.itens.map((i) => (
                    <tr key={i.desc} className="border-t border-border/70">
                      <td className="px-4 py-2.5">{i.desc}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{i.qtd}</td>
                      <td className="px-4 py-2.5 text-right font-medium">{i.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <span className="inline-flex items-center gap-2 rounded-md bg-warning-soft px-2.5 py-1 text-xs font-bold text-warning-foreground">
                <AlertTriangle className="size-3" /> XML pendente
              </span>
              <div className="flex flex-wrap gap-3">
                <button className="flex h-11 items-center gap-2 rounded-xl border border-border px-4 text-sm font-semibold transition-colors hover:bg-secondary">
                  <Download className="size-4 text-muted-foreground" /> Baixar XML
                </button>
                <button
                  data-nota-id={nota.id}
                  className="flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <ExternalLink className="size-4" /> Ver nota no CS Emite
                </button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function NotasTable({ onSelect }: { onSelect: (n: Nota) => void }) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-card">
      <div className="flex flex-wrap items-center gap-4 p-6">
        <h3 className="text-[22px] font-extrabold tracking-tight">Notas emitidas</h3>
        <span className="inline-flex items-center gap-2 rounded-lg bg-warning-soft px-3 py-1.5 text-sm font-medium text-warning-foreground">
          <AlertTriangle className="size-4" /> 7 notas estão sem o arquivo XML guardado.
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Buscar nota ou consumidor..."
              className="h-11 w-60 rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <button className="flex h-11 items-center gap-6 rounded-lg border border-border px-3 text-sm transition-colors hover:bg-secondary">
            Todos os modelos <ChevronDown className="size-4 text-muted-foreground" />
          </button>
          <button className="flex h-11 items-center gap-6 rounded-lg border border-border px-3 text-sm transition-colors hover:bg-secondary">
            Todos os status <ChevronDown className="size-4 text-muted-foreground" />
          </button>
          <button className="flex h-11 items-center gap-2 rounded-lg border border-border px-4 text-sm font-semibold transition-colors hover:bg-secondary">
            <Download className="size-4 text-muted-foreground" /> Baixar XMLs
          </button>
        </div>
      </div>

      <div className="overflow-x-auto px-6">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border text-sm font-semibold text-muted-foreground">
              <th className="py-3 pr-4 font-semibold">Nota</th>
              <th className="py-3 pr-4 font-semibold">Modelo</th>
              <th className="py-3 pr-4 font-semibold">Consumidor</th>
              <th className="py-3 pr-4 font-semibold">
                <span className="inline-flex items-center gap-1.5">
                  Emissão <ArrowUpDown className="size-3.5" />
                </span>
              </th>
              <th className="py-3 pr-4 font-semibold">Valor</th>
              <th className="py-3 pr-4 font-semibold">Status</th>
              <th className="py-3 pr-4 font-semibold">XML</th>
              <th className="py-3 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((n) => (
              <tr
                key={n.id}
                onClick={() => onSelect(n)}
                className="cursor-pointer border-b border-border/70 transition-colors last:border-0 hover:bg-secondary/70"
              >
                <td className="py-4 pr-4 text-sm font-semibold">
                  {n.numero} · {n.serie}
                </td>
                <td className="py-4 pr-4">
                  <span
                    className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold ${
                      n.modelo === "NFC-e"
                        ? "bg-info-soft text-info"
                        : "bg-success-soft text-accent-foreground"
                    }`}
                  >
                    {n.modelo}
                  </span>
                </td>
                <td className="py-4 pr-4 text-sm text-muted-foreground">{n.consumidor}</td>
                <td className="py-4 pr-4 text-sm text-muted-foreground">
                  {n.emissao.split(" · ")[0]}
                </td>
                <td className="py-4 pr-4 text-sm font-medium">{n.valor}</td>
                <td className="py-4 pr-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-bold ${
                      n.status === "Autorizada"
                        ? "bg-success-soft text-accent-foreground"
                        : "bg-danger-soft text-destructive"
                    }`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        n.status === "Autorizada" ? "bg-success" : "bg-destructive"
                      }`}
                    />
                    {n.status}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-warning-soft px-2.5 py-1 text-xs font-bold text-warning-foreground">
                    <AlertTriangle className="size-3" /> Pendente
                  </span>
                </td>
                <td className="py-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(n);
                    }}
                    aria-label={`Ações da nota ${n.numero}`}
                    className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    <MoreHorizontal className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
        <p className="text-sm text-muted-foreground">Mostrando 1 a 5 de 7 notas</p>
        <div className="flex items-center gap-2">
          <button className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary">
            <ChevronLeft className="size-4" />
          </button>
          <button className="size-9 rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            1
          </button>
          <button className="size-9 rounded-lg border border-border text-sm font-medium transition-colors hover:bg-secondary">
            2
          </button>
          <button className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [selected, setSelected] = useState<Nota | null>(null);

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Topbar />
        <div className="space-y-6 px-8 pb-12">
          <ClientHeader />
          <OverviewHeader />
          <Stats />
          <ModelCards />
          <NotasTable onSelect={setSelected} />
        </div>
      </main>
      <NotaDetails nota={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
