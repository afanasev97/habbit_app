const pendingPromises = new Map();

class P extends Promise {
  constructor(executor) {
    const id = Symbol();
    const wrappedExecutor = (resolve, reject) => {
      const wrappedResolve = () => {
        this.clearFromPending(id);
        return resolve(...arguments);
      };
      const wrappedReject = () => {
        this.clearFromPending(id);
        return reject(...arguments);
      };
      
      return executor(wrappedResolve, wrappedReject);
    };

    super(wrappedExecutor);

    pendingPromises.set(id, this);
    this.executor = executor;

    Error.captureStackTrace(this, P);
  }

  clearFromPending(id) {
    pendingPromises.delete(id);
  }
}

global.Promise = P;

function getPendingPromises() {
  return Array.from(pendingPromises.values()).map(promise => ({
    executor: promise.executor.toString(),
    stack: promise.stack
  }));
}

function getPendingPromisesCount() {
  return pendingPromises.size;
}

// Пример использования

async function test() {
  const pendingPromise1 = new Promise(resolve => setTimeout(resolve, 3000));
  const pendingPromise2 = new Promise(resolve => setTimeout(resolve, 5000));
  const pendingPromise3 = new Promise(() => {});

  console.log('Number of Pending Promises Before:', getPendingPromisesCount());
  console.log('Pending Promises Before:', getPendingPromises());
  
  await Promise.all([pendingPromise1, pendingPromise2]);

  console.log('Number of Pending Promises After:', getPendingPromisesCount());
  console.log('Pending Promises After:');
  getPendingPromises().forEach(({ executor, stack }) => {
    console.log(executor, stack);
  });
}

test();
