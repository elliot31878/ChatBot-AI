type AnyRef = React.Ref<unknown> | React.LegacyRef<unknown> | undefined;

export function mergeRefs(...refs: AnyRef[]): React.RefCallback<unknown> {
  return (instance) => {
    refs.forEach((ref) => {
      if (ref == null || !ref) {
        return;
      }

      if (typeof ref === "function") {
        ref(instance);
      } else {
        (ref as React.MutableRefObject<unknown>).current = instance;
      }
    });
  };
}
