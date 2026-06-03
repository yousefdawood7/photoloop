export default function AuthMessage() {
  return (
    <div className="absolute z-2 bottom-0 font-inter mb-5 pl-5 flex flex-col gap-1.5">
      <div>
        <p className="text-3xl text-muted-foreground font-light">
          Capture <span className="text-primary">Moments</span>
        </p>
        <p className="text-xl font-inter font-light">with photoloop</p>
      </div>
      <p className="text-sm text-muted-foreground">
        Share photos, loops, and stories with the people who matter most.
      </p>
    </div>
  );
}
