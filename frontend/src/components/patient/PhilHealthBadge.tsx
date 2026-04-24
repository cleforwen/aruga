export function PhilHealthBadge(props: { status: string }) {
  const isPending = props.status === 'PENDING' || !props.status;
  const isActive = props.status === 'ACTIVE';
  const isInactive = props.status === 'INACTIVE';
  const isLapsed = props.status === 'LAPSED';

  if (isActive) {
    return (
      <span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded-sm bg-ph-active-bg text-ph-active-text border border-ph-active-border">
        <span class="w-1.5 h-1.5 rounded-full bg-ph-active"></span> ACTIVE
      </span>
    );
  }
  if (isInactive) {
    return (
      <span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded-sm bg-ph-inactive-bg text-ph-inactive-text border border-ph-inactive-border">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-ph-inactive"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        INACTIVE
      </span>
    );
  }
  if (isLapsed) {
    return (
      <span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded-sm bg-ph-lapsed-bg text-ph-lapsed-text border border-ph-lapsed-border">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-ph-lapsed"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        LAPSED <span class="font-normal">(Self-Pay)</span>
      </span>
    );
  }
  return (
    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-semibold rounded-sm bg-ph-pending-bg text-ph-pending-text border border-ph-pending-border">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-ph-pending"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      PENDING
    </span>
  );
}