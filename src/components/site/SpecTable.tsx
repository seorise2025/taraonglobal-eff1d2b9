export function SpecTable({
  rows,
}: {
  rows: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r.label}
              className={i % 2 === 0 ? "bg-transparent" : "bg-secondary/40"}
            >
              <th className="w-1/2 px-5 py-3 font-medium text-forest-deep">
                {r.label}
              </th>
              <td className="px-5 py-3 text-ink/80">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
